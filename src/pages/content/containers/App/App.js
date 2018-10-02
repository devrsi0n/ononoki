import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ConfigPanel from '../ConfigPanel';
import Previewer from '../../components/Previewer';
import GIF from '../../core/gif';

const isProd = process.env.NODE_ENV === 'production';

export default class App extends Component {
  static propTypes = {
    btnStyle: PropTypes.object.isRequired,
    video: PropTypes.instanceOf(Element).isRequired, // DOM node
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
    const { video } = this.props;
    video.addEventListener('loadeddata', this.setVideoInfo, false);
    // In case video already loaded
    if (video.readyState === 4) {
      this.setVideoInfo();
    }
  }

  onConfirm = async () => {
    this.gif = new GIF(this.props, this.props.video);
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
      const ref = this.props.video;
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
    this.gif.abort();
    this.setState({
      openPreviewer: false,
      image: null,
    });
  };

  onTimeUpdate = ({ min, sec, ms }) => {
    this.props.video.currentTime = min * 60 + sec + ms / 1000;
  };

  setVideoInfo = () => {
    const { duration, videoWidth, videoHeight } = this.props.video;
    let trueDuration = duration;
    if (!Number.isFinite(duration)) {
      /* eslint-disable prefer-destructuring */
      trueDuration = this.props.video.trueDuration;
    }
    this.props.onConfigChange({
      duration: this.getMinSec(trueDuration, true),
      videoWidth,
      videoHeight,
    });
  };

  getMinSec(time, isDuration = false) {
    let ms = 0;
    if (isDuration) ms = Math.floor((time % 1) * 1000);
    return {
      min: Math.floor(time / 60),
      sec: Math.floor(time % 60),
      ms,
    };
  }

  render() {
    const { onClickBtn, onConfirm, onClosePreviewer, onTimeUpdate } = this;
    const { openConfigPanel, openPreviewer, btnRef, image } = this.state;
    const { btnStyle, width, height } = this.props;

    return (
      <div
        style={{
          fontSize: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
