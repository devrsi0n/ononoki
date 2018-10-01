import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Avatar from '@material-ui/core/Avatar';
import IconSend from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import TextInput from '../../components/TextInput';
import TimeSelect from '../../components/TimeSelect';
import Slider from '../../components/Slider';
import logo from './logo.jpg';

const styles = () => ({
  root: {
    zIndex: 200,
  },
  header: {
    paddingBottom: 0,
  },
  verticalGap: {
    marginLeft: '30px',
  },
  rowGap: {
    marginTop: '20px',
  },
  common: {
    width: '155px',
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class ConfigPanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    frameRate: PropTypes.number.isRequired,
    quality: PropTypes.number.isRequired,
    startOptions: PropTypes.object.isRequired,
    endOptions: PropTypes.object.isRequired,
    onConfigChange: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onTimeUpdate: PropTypes.func,
  };

  static defaultProps = {
    anchorEl: null,
    onTimeUpdate() {},
  };

  onTimeChange = (label, type) => event => {
    this.props.onConfigChange({
      [label]: {
        [type]: event.target.value,
      },
    });
    const value = { ...this.props[label], [type]: event.target.value };
    this.props.onTimeUpdate(value);
  };

  onNumberChange = type => event => {
    const { value } = event.target;
    const val = Number(value);
    if (Number.isNaN(val)) {
      return;
    }
    this.props.onConfigChange({
      [type]: val,
    });
  };

  onQualityChange = (event, value) => {
    this.props.onConfigChange({
      quality: value,
    });
  };

  render() {
    const {
      start,
      end,
      classes,
      open,
      anchorEl,
      width,
      height,
      frameRate,
      quality,
      startOptions,
      endOptions,
      onConfirm,
    } = this.props;

    const startTime = start.min * 60 + start.sec + start.ms / 1000;
    const endTime = end.min * 60 + end.sec + end.ms / 1000;
    const disableConfirmBtn = startTime >= endTime;

    return (
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        className={classes.root}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={500}>
            <Card>
              <CardHeader
                className={classes.header}
                title="Ononoki"
                titleTypographyProps={{ variant: 'title' }}
                avatar={<Avatar aria-label="Logo" src={logo} />}
              />
              <CardContent>
                <FormControl>
                  <FormGroup row>
                    <TimeSelect
                      label="开始时间"
                      value={start}
                      options={startOptions}
                      onMinChange={this.onTimeChange('start', 'min')}
                      onSecChange={this.onTimeChange('start', 'sec')}
                      onMsChange={this.onTimeChange('start', 'ms')}
                    />

                    <TimeSelect
                      className={classes.verticalGap}
                      label="结束时间"
                      value={end}
                      options={endOptions}
                      onMinChange={this.onTimeChange('end', 'min')}
                      onSecChange={this.onTimeChange('end', 'sec')}
                      onMsChange={this.onTimeChange('end', 'ms')}
                    />
                  </FormGroup>
                  <FormGroup row className={classes.rowGap}>
                    <TextInput
                      label="宽度"
                      value={width}
                      onChange={this.onNumberChange('width')}
                      className={classes.common}
                    />
                    <TextInput
                      label="高度"
                      value={height}
                      onChange={this.onNumberChange('height')}
                      className={`${classes.common} ${classes.verticalGap}`}
                    />
                  </FormGroup>
                  <FormGroup row className={classes.rowGap}>
                    <TextInput
                      label="帧率"
                      value={frameRate}
                      onChange={this.onNumberChange('frameRate')}
                      className={classes.common}
                    />
                    <Slider
                      label="录制质量"
                      min={0}
                      max={10}
                      step={1}
                      value={quality}
                      onChange={this.onQualityChange}
                      className={`${classes.common} ${classes.verticalGap}`}
                    />
                  </FormGroup>
                </FormControl>
              </CardContent>
              <CardActions className={classes.alignCenter}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={disableConfirmBtn}
                  onClick={onConfirm}
                >
                  GO
                  <IconSend style={{ marginLeft: '10px', width: '18px' }} />
                </Button>
              </CardActions>
            </Card>
          </Fade>
        )}
      </Popper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ConfigPanel);
