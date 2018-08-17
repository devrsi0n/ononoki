import GIF from 'gif.js/dist/gif';
// import Worker from 'gif.js/dist/gif.worker';

export default class Gif {
  constructor({ start, end }) {
    this.gif = new GIF({
      width: 320,
      height: 240,
      // Logical processor size
      workers: window.navigator.hardwareConcurrency,
      // workerScript: Worker,
      debug: true,
    });

    this.gif.on('finished', blob => {
      window.open(URL.createObjectURL(blob));
    });
  }
}
