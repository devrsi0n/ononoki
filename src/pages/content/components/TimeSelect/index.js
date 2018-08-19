import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
// import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import Select from '../Select';

const styles = {
  label: {
    marginBottom: '5px',
  },

  second: {
    marginLeft: '5px',
  },
};

class TimeSelect extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,

    onMinChange: PropTypes.func.isRequired,
    onSecChange: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  makeSelectOptions = num => ({ label: `${num}`, value: num });

  render() {
    const {
      label,
      options,
      value,
      onMinChange,
      onSecChange,
      classes,
      className,
    } = this.props;

    return (
      <FormControl className={className}>
        <FormLabel component="legend" className={classes.label}>
          {label}
        </FormLabel>
        <FormGroup row>
          <Select
            label="分"
            value={value.min}
            options={options.min.map(this.makeSelectOptions)}
            onChange={onMinChange}
          />
          {/* <Typography variant="body2" gutterBottom>
            :
          </Typography> */}
          <Select
            className={classes.second}
            label="秒"
            value={value.sec}
            options={options.sec.map(this.makeSelectOptions)}
            onChange={onSecChange}
          />
        </FormGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(TimeSelect);
