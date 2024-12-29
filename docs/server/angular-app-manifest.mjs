
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/rick-and-morty-catalog/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 27224, hash: '24f83854e76807aaea0efe8844819c70e28d6403859c99360d6611b431d7a99c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 27054, hash: 'fbdc27bd78fbee43b30a2bfbb12fdaf664ab54d8bfc5cb306bd40d8fd3ed4bc1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-PWI3PDN6.css': {size: 753, hash: '1LKNHf7gQL4', text: () => import('./assets-chunks/styles-PWI3PDN6_css.mjs').then(m => m.default)}
  },
};
