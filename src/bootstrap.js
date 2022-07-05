import loader from 'https://cdn.jsdelivr.net/npm/uce-loader@2.0.0/+esm';

loader({
  container: document.body,
  on(tag) {
    if (!tag.match(/^(m-)(.*)/)) return;

    const dir = import.meta.url.replace(/\/bootstrap.js$/, '');
    const name = tag.replace(/^m-/, '');
    const script = Object.assign(document.createElement('script'), {
      src: `${dir}/${name}.js`,
      type: 'module',
    });

    document.head.appendChild(script);
  },
});
