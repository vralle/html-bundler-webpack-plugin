const path = require('path');
const HtmlBundlerPlugin = require('@test/html-bundler-webpack-plugin');

module.exports = {
  //mode: 'development',
  mode: 'production',
  target: 'web',

  output: {
    publicPath: 'https://example.site/',
    crossOriginLoading: 'use-credentials', // required for test Subresource Integrity
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        //jquery: 'https://code.jquery.com/ui/1.13.2/jquery-ui.min.js',
        //test: the relative asset file must be the same as pathname of `compilation.assets`
        'pages/index': './src/index.html',
      },

      js: {
        filename: 'assets/js/[name].bundle.js',
      },

      css: {
        filename: 'assets/css/[name].bundle.css',
      },

      integrity: true, // test the `true` value
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader'],
      },

      {
        test: /\.(png|jpe?g|ico|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
