// TODO: Watch page part refresh
export default function youtube(render) {
  if (!window.location.origin.includes('youtube')) {
    return;
  }

  const anchor = document.createElement('div');

  const container = document.querySelector('.ytp-right-controls');
  if (container) {
    container.parentNode.insertBefore(anchor, container.nextSibling);
    render(
      anchor,
      {
        color: 'hsla(0,0%,100%,.9)',
      },
      document.querySelector('video')
    );
  }
}
