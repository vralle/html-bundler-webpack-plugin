const path = require('path');
const HtmlBundlerPlugin = require('@test/html-bundler-webpack-plugin');

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist/'),
    // add a publicPath to avoid JS error generated by Webpack: "Automatic publicPath is not supported in this browser"
    publicPath: '', // by importing an image in the JS file, the publicPath must not be auto
  },

  resolve: {
    alias: {
      '@images': path.join(__dirname, '../../fixtures/images'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: './src/index.html',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      // Note: since v4.12 the plugin supports the `?inline` query to load assets as data URL
      {
        test: /\.(svg|png|jpe?g)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024,
          },
        },
        generator: {
          filename: 'img/[name].[hash:8][ext]',
          // test: plugin defaults encoding
          dataUrl: {
            // encoding values:
            // 'base64' - generates base64-encoded data URL (Webpack defaults)
            // false    - generates escaped data URL, use it only for SVG
            //encoding: false,
            //encoding: 'base64',
          },
        },
      },
    ],
  },
};
