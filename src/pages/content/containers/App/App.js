import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ConfigPanel from '../ConfigPanel';
import Previewer from '../../components/Previewer';
import GIF from '../../core/gif';

const isProd = process.env.NODE_ENV === 'production';

// const Video = null;
let Video = null;
if (!isProd) {
  Video = require('../../components/Video').default;
}

export default class App extends Component {
  static propTypes = {
    btnStyle: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onConfigChange: PropTypes.func.isRequired,
  };

  state = {
    openConfigPanel: false,
    openPreviewer: false,
    image: null,
    btnRef: null,
  };

  componentDidMount() {
    const ref = this.getVideoRef();
    ref.addEventListener('loadeddata', this.setVideoInfo, false);
  }

  onConfirm = async () => {
    const ref = this.getVideoRef();
    this.gif = new GIF(this.props, ref);
    this.setState({
      openPreviewer: true,
    });
    const image = await this.gif.record();
    this.setState({
      image,
    });
  };

  onClickBtn = event => {
    const { currentTarget } = event;

    if (!this.state.openConfigPanel) {
      // Pause video before open config panel
      const ref = this.getVideoRef();
      if (!ref.paused) {
        ref.pause();
      }

      // Set start time to current time
      const { currentTime } = ref;
      if (currentTime > 6) {
        this.props.onConfigChange({
          start: this.getMinSec(currentTime - 6),
          end: this.getMinSec(currentTime - 1),
        });
      }
    }

    this.setState(preState => ({
      btnRef: currentTarget,
      openConfigPanel: !preState.openConfigPanel,
    }));
  };

  onClosePreviewer = () => {
    this.setState({
      openPreviewer: false,
      image: null,
    });
  };

  onTimeUpdate = ({ min, sec }) => {
    this.getVideoRef().currentTime = min * 60 + sec;
  };

  setVideoInfo = () => {
    const ref = this.getVideoRef();
    ref.currentTime = 24 * 60 * 60;
    const doneSeeking = () => {
      ref.removeEventListener('seeked', doneSeeking);
      const { duration, videoWidth, videoHeight } = ref;
      this.props.onConfigChange({
        duration: this.getMinSec(duration),
        videoWidth,
        videoHeight,
      });
    };
    ref.addEventListener('seeked', doneSeeking);
  };

  getVideoRef() {
    return document.querySelector('video');
  }

  getMinSec(time) {
    return {
      min: Math.floor(time / 60),
      sec: Math.floor(time % 60),
    };
  }

  render() {
    const { onClickBtn, onConfirm, onClosePreviewer, onTimeUpdate } = this;
    const { openConfigPanel, openPreviewer, btnRef, image } = this.state;
    const { btnStyle, width, height } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {Video && <Video />}
        <Previewer
          open={openPreviewer}
          image={image}
          width={width}
          height={height}
          onClose={onClosePreviewer}
        />
        <ConfigPanel
          open={openConfigPanel}
          onConfirm={onConfirm}
          anchorEl={btnRef}
          onTimeUpdate={onTimeUpdate}
        />
        <Button
          onClick={onClickBtn}
          style={isProd ? btnStyle : { marginTop: '300px' }}
        >
          Ononoki
        </Button>
      </div>
    );
  }
}
