import React, { PureComponent } from 'react';
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
    color: '#212121',
  },

  second: {
    marginLeft: '5px',
  },
};

class TimeSelect extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.shape({
      min: PropTypes.array,
      sec: PropTypes.array,
      ms: PropTypes.array,
    }).isRequired,
    value: PropTypes.shape({
      min: PropTypes.number,
      sec: PropTypes.number,
      ms: PropTypes.number,
    }).isRequired,

    onMinChange: PropTypes.func.isRequired,
    onSecChange: PropTypes.func.isRequired,
    onMsChange: PropTypes.func.isRequired,

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
      onMsChange,
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
          <Select
            className={classes.second}
            label="秒"
            value={value.sec}
            options={options.sec.map(this.makeSelectOptions)}
            onChange={onSecChange}
          />
          <Select
            className={classes.second}
            label="毫秒"
            value={value.ms}
            options={options.ms.map(this.makeSelectOptions)}
            onChange={onMsChange}
          />
        </FormGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(TimeSelect);
