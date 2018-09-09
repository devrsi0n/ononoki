import GIF from 'gif.js/dist/gif';
/* eslint-disable import/extensions, no-param-reassign, no-await-in-loop */

// Import worker.js as string, using raw-loader
import gifWorker from 'gif.js/dist/gif.worker.js';
import EventEmitter from 'eventemitter3';

const workerBlob = new Blob([gifWorker], {
  type: 'application/javascript',
});

const RECORD_FINISHED = 'RECORD_FINISHED';

export default class Gif extends EventEmitter {
  /**
   *
   * @param {object} configs
   * @param {number} configs.start record start time, millisecond
   * @param {HTMLVideoElement} video html5 video element
   */
  constructor(
    {
      width = 640,
      height = 360,
      frameRate = 10,
      start,
      end,
      quality = 10,
      repeat = 0,
    },
    video
  ) {
    super();

    if (!video.paused) {
      video.pause();
    }

    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
    this.frameInterval = 1000 / this.frameRate;
    this.start = (start.min * 60 + start.sec) * 1000;
    this.end = (end.min * 60 + end.sec) * 1000;
    this.quality = 31 - quality * 3;
    const duration = end - start;
    // True duration
    this.duration = duration - (duration % this.frameInterval);

    this.gif = new GIF({
      width,
      height,
      repeat,
      workers: 2,
      workerScript: URL.createObjectURL(workerBlob),
      debug: true,
    });

    this.video = video;
    this.aborted = false;

    this.videoWidth = video.getBoundingClientRect().width;
    this.videoHeight = video.getBoundingClientRect().height;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', this.videoWidth);
    this.canvas.setAttribute('height', this.videoHeight);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.imageRendering = 'crisp-edges';
    this.canvasCtx = this.canvas.getContext('2d');
    this.resizedCanvas = document.createElement('canvas');
    this.resizedCanvasCtx = this.resizedCanvas.getContext('2d');
    this.resizedCanvas.setAttribute('width', width);
    this.resizedCanvas.setAttribute('height', height);

    this.gif.on('finished', blob => {
      const obj = window.URL.createObjectURL(blob);
      this.emit(RECORD_FINISHED, obj);
    });
  }

  async record() {
    await this.seekTo(this.start);
    const getCurrTime = () => this.video.currentTime * 1000;
    while (getCurrTime() < this.end) {
      this.addFrame();
      const nextTime = getCurrTime() + this.frameInterval;
      await this.seekTo(nextTime);
    }
    this.gif.render();

    return new Promise(resolve => {
      this.once(RECORD_FINISHED, blob => {
        resolve(blob);
      });
    });
  }

  addFrame() {
    if (this.aborted) return;

    const { video, canvas, resizedCanvasCtx } = this;

    this.canvasCtx.drawImage(video, 0, 0, this.videoWidth, this.videoHeight);
    resizedCanvasCtx.drawImage(canvas, 0, 0, this.width, this.height);
    this.gif.addFrame(resizedCanvasCtx, {
      delay: this.frameInterval,
      dispose: 1,
      copy: true,
    });
  }

  /**
   * Seek through <video> frames
   * @param {number} time milliseconds
   */
  seekTo(time) {
    return new Promise(resolve => {
      const doneSeeking = () => {
        this.video.removeEventListener('seeked', doneSeeking);
        resolve();
      };
      this.video.addEventListener('seeked', doneSeeking);
      this.video.currentTime = time / 1000;
    });
  }

  abort() {
    if (!this.gif) return;

    this.aborted = true;
    this.gif.abort();
    this.gif = null;
  }
}
