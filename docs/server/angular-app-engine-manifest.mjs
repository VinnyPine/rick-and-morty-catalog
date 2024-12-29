
export default {
  basePath: '/rick-and-morty-catalog/',
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
