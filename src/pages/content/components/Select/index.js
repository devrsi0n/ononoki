import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';

export default class SelectWithError extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
  };

  static defaultProps = {
    className: '',
    onChange() {},
  };

  render() {
    const { className, label, value, onChange, options } = this.props;
    return (
      <FormControl className={className}>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          name={label}
          // renderValue={value => `⚠️  - ${value}`}
          // input={<Input id="name-error" />}
        >
          {options.map(option => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}
