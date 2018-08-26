const getStyle = newPage => ({
  color: newPage ? 'hsla(0,0%,100%,.9)' : '#99a2aa',
  marginTop: newPage ? '-7px' : '-4px',
});

export default function Bilibili(render) {
  if (!window.location.origin.includes('bilibili')) {
    return;
  }

  const anchor = document.createElement('div');

  const root = document.querySelector(
    '.bilibili-player-video-control-bottom-right'
  );
  if (root) {
    root.appendChild(anchor);
    render(anchor, getStyle(true));
  } else {
    const OLD_VERSION_CLASS = '.bilibili-player-video-time';

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (!mutation.addedNodes) return;

        const oldRoot = document.querySelector(OLD_VERSION_CLASS);
        if (oldRoot && document.querySelector('video')) {
          oldRoot.parentNode.insertBefore(anchor, oldRoot.nextSibling);
          render(anchor, getStyle(false));
          // stop watching
          observer.disconnect();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }
}
