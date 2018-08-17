import React, { Component } from 'react';
import video from './clip.mp4';
import GIF from '../../core/gif';

export default class Video extends Component {
  constructor(...args) {
    super(...args);
    this.gif = new GIF({});
  }

  render() {
    return (
      <div>
        <video src={video} controls />
      </div>
    );
  }
}
