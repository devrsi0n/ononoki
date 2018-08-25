import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ConfigPanel from '../ConfigPanel';
import Previewer from '../../components/Previewer';
import GIF from '../../core/gif';

const Video = null;
// let Video = null;
// const isProd = process.env.NODE_ENV === 'production';
// if (!isProd) {
//   Video = require('../../components/Video').default;
// }

const StyledPanel = styled(ConfigPanel)`
  margin: 20px auto;
`;

export default class App extends Component {
  static propTypes = {
    newPage: PropTypes.bool.isRequired,
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
    const { duration, videoWidth, videoHeight } = ref;
    this.props.onConfigChange({
      duration: this.getMinSec(duration),
      videoWidth,
      videoHeight,
    });
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
    const { newPage, width, height } = this.props;

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
        <StyledPanel
          open={openConfigPanel}
          onConfirm={onConfirm}
          anchorEl={btnRef}
          onTimeUpdate={onTimeUpdate}
        />
        <Button
          onClick={onClickBtn}
          style={{
            color: newPage ? 'hsla(0,0%,100%,.9)' : '#99a2aa',
            marginTop: newPage ? '-7px' : '-4px',
          }}
        >
          Ononoki
        </Button>
      </div>
    );
  }
}
