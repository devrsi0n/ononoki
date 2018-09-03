export default function iqiyi(render) {
  if (!window.location.origin.includes('iqiyi')) {
    return;
  }

  const anchor = document.createElement('div');

  const root = document.querySelector('div.danmu-main');
  if (root) {
    root.appendChild(anchor);
    const video = document.querySelector('video');
    const id = setInterval(() => {
      let text = document.querySelector('span.time-all').textContent;
      if (text.length) {
        clearInterval(id);
      }
      text = text.slice(1, text.length);
      const [min, sec] = text.split(':');
      const duration = Number(min) * 60 + Number(sec);
      video.trueDuration = duration;

      render(
        anchor,
        {
          color: '#aaa',
          marginTop: '-10px',
          marginLeft: '108px',
        },
        video
      );
    }, 1000);
  }
}
