const path = require('path');
const HtmlBundlerPlugin = require('@test/html-bundler-webpack-plugin');

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist/'),
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: 'src/index.pug',
      },
      preprocessor: 'pug',
      preprocessorOptions: {
        doctype: 'html5', // if in Pug template used `doctype html5` then add this option here too
      },
    }),
  ],
};
