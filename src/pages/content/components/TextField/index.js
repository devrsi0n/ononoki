import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

class TextField extends Component {
  static propTypes = {
    // classes: PropTypes.objectOf(styles).isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.object,
  };

  static defaultProps = {
    className: {},
  };

  render() {
    const { value, error, label, errorText, onChange, className } = this.props;

    return (
      <FormControl
        className={className}
        error={error}
        aria-describedby={errorText}
      >
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <Input id={label} value={value} onChange={onChange} />
        <FormHelperText id={errorText}>{errorText}</FormHelperText>
      </FormControl>
    );
  }
}

export default withStyles(styles)(TextField);
