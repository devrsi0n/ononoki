import { SET_CONFIGS } from '../types';
import { mergeDeep } from '../helpers';

const initState = {
  start: {
    min: 0,
    sec: 0,
  },
  end: {
    min: 0,
    sec: 0,
  },
  width: 320, // GIF width
  height: 240,
  frameRate: 10,
  quality: 1,

  videoWidth: 0,
  videoHeight: 0,

  // Video duration time
  duration: {
    min: 0,
    sec: 0,
  },

  startOptions: {
    min: [0],
    sec: [0],
  },
  endOptions: {
    min: [0],
    sec: [0],
  },
};

function getTimeOptions(duration, time) {
  const minOptions = [...Array((duration.min || 0) + 1).keys()];
  const secOptions = [...Array(60).keys()];
  if (minOptions[minOptions.length - 1] === time.min) {
    return {
      min: minOptions,
      sec: [...Array((duration.sec || 0) + 1).keys()],
    };
  }

  return {
    min: minOptions,
    sec: secOptions,
  };
}

function keepWidthHeightRate(state, newWidth) {
  const { width, height, videoWidth, videoHeight } = state;
  if (!videoWidth || !videoHeight) {
    return state;
  }
  if (newWidth) {
    return {
      height: width * (videoHeight / videoWidth),
    };
  }
  return {
    width: height * (videoWidth / videoHeight),
  };
}

const configs = (state = initState, action) => {
  const { type, data } = action;

  switch (type) {
    case SET_CONFIGS: {
      const result = {};
      mergeDeep(result, state, data);
      const keys = Object.keys(data);
      if (
        keys.includes('start') ||
        keys.includes('end') ||
        keys.includes('duration')
      ) {
        mergeDeep(result, {
          startOptions: getTimeOptions(result.duration, result.start),
          endOptions: getTimeOptions(result.duration, result.end),
        });
      }
      if (keys.includes('width')) {
        mergeDeep(result, keepWidthHeightRate(result, true));
      } else if (keys.includes('height')) {
        mergeDeep(result, keepWidthHeightRate(result, false));
      }

      if (keys.includes('videoWidth') || keys.includes('videoHeight')) {
        mergeDeep(result, {
          width: data.videoWidth / 3,
          height: data.videoHeight / 3,
        });
      }
      return result;
    }
    default:
      return state;
  }
};

export default configs;
