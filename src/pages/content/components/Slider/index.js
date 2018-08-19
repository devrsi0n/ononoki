import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  label: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
};

class LabelSlider extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,

    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const {
      label,
      value,
      min,
      max,
      step,
      onChange,
      className,
      classes,
    } = this.props;

    return (
      <FormControl className={className}>
        <FormLabel component="legend" className={classes.label} id={label}>
          {label}
        </FormLabel>
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          aria-labelledby={label}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(LabelSlider);
