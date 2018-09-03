import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';

const style = {
  paper: {
    minWidth: '320px',
  },
};

const IMG_MAX_WIDTH = 500;

class Previewer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    image: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    image: null,
  };

  onClickSave = () => {
    const { link } = this;
    link.download = `${document.title.slice(0, 15)}.gif`;
    link.target = '_blank';
    link.href = this.props.image;
    link.click();
    this.props.onClose();
  };

  link = document.createElement('a');

  render() {
    const { open, image, classes, onClose } = this.props;
    let { width, height } = this.props;
    if (width > IMG_MAX_WIDTH) {
      height = IMG_MAX_WIDTH * (height / width);
      width = IMG_MAX_WIDTH;
    }

    return (
      <Dialog open={open} aria-labelledby="dialog-title" classes={classes}>
        <DialogTitle id="dialog-title">预览</DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
          {image ? (
            <img
              src={image}
              alt="GIF"
              style={{ width: `${width}px`, height: `${height}px` }}
            />
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            <DeleteIcon />
            取消
          </Button>
          <Button color="primary" onClick={this.onClickSave} disabled={!image}>
            <SaveIcon />
            保存
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(style)(Previewer);
