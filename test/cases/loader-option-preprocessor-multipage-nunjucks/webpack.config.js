const path = require('path');
const HtmlBundlerPlugin = require('../../../');
const Nunjucks = require('nunjucks');

const entryData = {
  home: {
    title: 'Home',
    filmTitle: 'Breaking Bad',
    description: 'Breaking Bad is an American crime drama',
    city: 'Albuquerque',
    state: 'New Mexico',
    imageFile: 'map.png',
    imageAlt: 'location',
  },
  about: {
    title: 'About',
    actors: [
      {
        firstname: 'Walter',
        lastname: 'White, "Heisenberg"',
      },
      {
        firstname: 'Jesse',
        lastname: 'Pinkman',
      },
    ],
  },
};

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist/'),
  },

  resolve: {
    alias: {
      '@images': path.join(__dirname, 'src/assets/images'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: {
          import: 'src/views/pages/home/index.html',
          data: entryData.home,
        },
        about: {
          import: 'src/views/pages/about/index.html',
          data: entryData.about,
        },
      },
      js: {
        filename: 'assets/js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader,
        options: {
          preprocessor: (content, { data }) => Nunjucks.renderString(content, data),
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
