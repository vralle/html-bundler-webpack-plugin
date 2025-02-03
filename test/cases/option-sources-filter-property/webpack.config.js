const path = require('path');
const HtmlBundlerPlugin = require('@test/html-bundler-webpack-plugin');

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist/'),
  },

  resolve: {
    alias: {
      '@images': path.join(__dirname, '../../fixtures/images'),
      '@videos': path.join(__dirname, '../../fixtures/videos'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: './src/index.html',
      },
      sources: [
        // resolve one attribute only if another attribute has a special value
        {
          tag: 'meta',
          attributes: ['content'],
          filter: ({ attributes }) => {
            const attrName = 'property';
            const attrValues = ['og:image', 'og:video']; // allowed values

            if (!attributes[attrName] || attrValues.indexOf(attributes[attrName]) < 0) {
              return false; // return false to disable processing
            }
            // return true or undefined to enable processing
          },
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/video/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
