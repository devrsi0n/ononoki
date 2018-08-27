import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
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

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default hot(module)(ReduxApp);
