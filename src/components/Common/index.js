import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Common.css';

/* eslint-disable react/prefer-stateless-function */
export default class Common extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  // static defaultProps = {
  //   children: <></>,
  // };

  render() {
    const { children } = this.props;

    return <Fragment>{children}</Fragment>;
  }
}
