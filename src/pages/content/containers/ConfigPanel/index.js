import { connect } from 'react-redux';
import { setConfigs } from '../../actions';
import ConfigPanel from './ConfigPanel';

const mapStateToProps = state => ({
  start: state.start,
  end: state.end,
  width: state.width,
  height: state.height,
  frameRate: state.frameRate,
  quality: state.quality,
  startOptions: state.startOptions,
  endOptions: state.endOptions,
});

const mapDispatchToProps = {
  onConfigChange: setConfigs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigPanel);
