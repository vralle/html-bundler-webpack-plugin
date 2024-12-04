const path = require('path');
const HtmlBundlerPlugin = require('@test/html-bundler-webpack-plugin');

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist/'),
  },

  resolve: {
    alias: {
      '@images': path.join(__dirname, '../../../fixtures/images'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: './src/index.hbs',
      },
      preprocessor: 'handlebars',
      preprocessorOptions: {
        partials: ['src/partials'],
      },
      data: {
        title: 'My Title',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ico|png|jp?g|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },
};
