const getStyle = newPage => ({
  color: newPage ? 'hsla(0,0%,100%,.9)' : '#99a2aa',
  marginTop: newPage ? '-7px' : '-4px',
});

const watchDomObserve = (selector, cb) => {
  let observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (!mutation.addedNodes) return;
      const root = document.querySelector(selector);
      const video = document.querySelector('video');
      if (root && video && observer) {
        cb(root, video);
        // stop watching
        observer.disconnect();
        observer = null;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
};

// TODO: Watch page part refresh
export default function bilibili(render) {
  if (!window.location.origin.includes('bilibili')) {
    return;
  }

  const anchor = document.createElement('div');
  anchor.setAttribute('id', 'ononoki');

  const newRoot = document.querySelector(
    '.bilibili-player-video-control-bottom-right'
  );
  if (newRoot) {
    watchDomObserve('.bilibili-player-video-btn-fullscreen', (root, video) => {
      document
        .querySelector('.bilibili-player-video-control-bottom-center')
        .appendChild(anchor);
      render(anchor, getStyle(true), video);
    });
  } else {
    watchDomObserve('.bilibili-player-video-time', (root, video) => {
      root.parentNode.insertBefore(anchor, root.nextSibling);
      render(anchor, getStyle(false), video);
    });
  }
}
