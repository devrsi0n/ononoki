import { connect } from 'react-redux';
import App from './App';
import { setConfigs } from '../../actions';

const mapStateToProps = state => ({
  start: state.start,
  end: state.end,
  width: state.width,
  height: state.height,
  frameRate: state.frameRate,
  quality: state.quality,
});

const mapDispatchToProps = {
  onConfigChange: setConfigs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
