export default function iqiyi(render) {
  if (!window.location.origin.includes('iqiyi')) {
    return;
  }

  const anchor = document.createElement('li');

  const root = document.querySelector('ul.control-right');
  if (root) {
    root.appendChild(anchor);
    render(anchor, {
      color: '#aaa',
      marginTop: '2px',
      marginRight: '20px',
    });
  }
}
