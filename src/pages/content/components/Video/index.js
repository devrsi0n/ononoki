import React, { Component } from 'react';
import video from './test.mp4';

export default class Video extends Component {
  render() {
    return (
      <div>
        <video src={video} controls />
      </div>
    );
  }
}
