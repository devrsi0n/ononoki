import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
// import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  label: {
    fontSize: '1rem',
    marginBottom: '5px',
  },

  second: {
    marginLeft: '5px',
  },
};

class TextInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string,

    classes: PropTypes.object.isRequired,
    className: PropTypes.string,

    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    type: 'string',
    onChange() {},
  };

  render() {
    const { label, value, classes, className, onChange, type } = this.props;
    return (
      <FormControl className={className}>
        <FormLabel component="legend" className={classes.label}>
          {label}
        </FormLabel>
        <Input id={label} value={value} onChange={onChange} type={type} />
      </FormControl>
    );
  }
}

export default withStyles(styles)(TextInput);
