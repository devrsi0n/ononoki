import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ConfigPanel from '../ConfigPanel';
import GIF from '../../core/gif';
import { setConfigs } from '../../actions';

const isProd = process.env.NODE_ENV === 'production';

const StyledPanel = styled(ConfigPanel)`
  margin: 20px auto;
`;

class App extends Component {
  static propTypes = {
    newPage: PropTypes.bool.isRequired,
    onConfigChange: PropTypes.func.isRequired,
  };

  state = {
    open: false,
    btnRef: null,
  };

  componentDidMount() {
    const ref = this.getBiliVideoRef();
    if (this.props.newPage) {
      ref.addEventListener('loadeddata', this.setVideoInfo, false);
    } else {
      this.setVideoInfo();
    }
  }

  onConfirm = async () => {
    const ref = this.getBiliVideoRef();
    this.gif = new GIF(this.props, ref);
    const objURL = await this.gif.record();
    const link = document.createElement('a');
    link.download = `${document.title.slice(0, 15)}.gif`;
    link.target = '_blank';
    link.href = objURL;
    link.click();
  };

  onClickBtn = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      btnRef: currentTarget,
      open: !state.open,
    }));
  };

  setVideoInfo = () => {
    const ref = this.getBiliVideoRef();
    const { duration, videoWidth, videoHeight } = ref;
    this.props.onConfigChange({
      duration: {
        min: Math.floor(duration / 60),
        sec: Math.floor(duration % 60),
      },
      videoWidth,
      videoHeight,
    });
  };

  getBiliVideoRef() {
    return document.querySelectorAll('video')[0];
  }

  render() {
    const { onClickBtn, onConfirm } = this;
    const { open, btnRef } = this.state;
    const { newPage } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StyledPanel
          maxTime={{ min: 0, sec: 4 }}
          open={open}
          onConfirm={onConfirm}
          anchorEl={btnRef}
        />
        <Button
          onClick={onClickBtn}
          style={{
            color: newPage ? 'white' : 'black',
            marginTop: isProd ? '-7px' : '380px',
          }}
        >
          Meme
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  start: state.start,
  end: state.end,
  width: state.width,
  height: state.height,
  frameRate: state.frameRate,
  quality: state.quality,
});

const mapDispatchToProps = {
  onConfigChange: setConfigs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
