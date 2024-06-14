/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'dist/public/build/',
  serverBuildTarget: '@remix-run/node',
  future: {
    v2_headers: true,
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_dev: true,
  },
  ignoredRouteFiles: ['**/.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
  // postcss: true,
  // publicPath: '/build',
  serverBuildPath: 'dist/index.js',
  serverDependenciesToBundle: ['reshaped', '@mercadopago/sdk-react'],
  serverMinify: true,
  serverModuleFormat: 'cjs',
  // tailwind: true,
  watchPaths: ['../../libs'],
};
