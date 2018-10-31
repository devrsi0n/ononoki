import produce from 'immer';
import { SET_CONFIGS } from '../types';

const initState = {
  start: {
    min: 0,
    sec: 0,
    ms: 0,
  },
  end: {
    min: 0,
    sec: 0,
    ms: 0,
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
    ms: 0,
  },

  startOptions: {
    min: [0],
    sec: [0],
    ms: [0],
  },
  endOptions: {
    min: [0],
    sec: [0],
    ms: [0],
  },
};

const getHundredMsOptions = threshold => {
  const options = [0];
  for (let i = 100; i < threshold; i += 100) {
    options.push(i);
  }
  return options;
};

const getTimeOptions = (duration, time) => {
  const minOptions = [...Array((duration.min || 0) + 1).keys()];
  let secOptions = [...Array(60).keys()];
  if (minOptions[minOptions.length - 1] === time.min) {
    secOptions = [...Array((duration.sec || 0) + 1).keys()];
    if (secOptions[secOptions.length - 1] === time.sec) {
      return {
        min: minOptions,
        sec: secOptions,
        ms: getHundredMsOptions(duration.ms),
      };
    }
    return {
      min: minOptions,
      sec: secOptions,
      ms: getHundredMsOptions(1000),
    };
  }

  return {
    min: minOptions,
    sec: secOptions,
    ms: getHundredMsOptions(1000),
  };
};

const keepWidthHeightRate = (state, isNewWidth) => {
  const { width, height, videoWidth, videoHeight } = state;
  if (!videoWidth || !videoHeight) {
    return;
  }
  if (isNewWidth) {
    state.height = Math.round(width * (videoHeight / videoWidth));
  }
  state.width = Math.round(height * (videoWidth / videoHeight));
};

// Bad reducer design
// TODO: refactor
const configs = (state = initState, action) => {
  const { type, data } = action;

  return produce(state, draft => {
    const keys = Object.keys(data);
    switch (type) {
      case SET_CONFIGS: {
        if (
          keys.includes('start') ||
          keys.includes('end') ||
          keys.includes('duration')
        ) {
          draft.startOptions = getTimeOptions(draft.duration, draft.start);
          draft.endOptions = getTimeOptions(draft.duration, draft.end);
        }
        if (keys.includes('width')) {
          keepWidthHeightRate(draft, true);
        } else if (keys.includes('height')) {
          keepWidthHeightRate(draft, false);
        }

        if (keys.includes('videoWidth') || keys.includes('videoHeight')) {
          draft.width = Math.round(data.videoWidth / 3);
          draft.height = Math.round(data.videoHeight / 3);
        }
      }
    }
  });
};

export default configs;
