const path = require('path');
const HtmlBundlerPlugin = require('@test/html-bundler-webpack-plugin');

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist/'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass'],
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: 'src/index.html',
      },
      js: {
        filename: '[name].[contenthash:8].js',
      },
      css: {
        filename: '[name].[contenthash:8].css',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: ['css-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|png|jpe?g|svg)/,
        type: 'asset/resource',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
