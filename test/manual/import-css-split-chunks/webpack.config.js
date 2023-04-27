const path = require('path');
const HtmlBundlerPlugin = require('../../../');

module.exports = {
  mode: 'production',
  stats: 'none',

  output: {
    path: path.join(__dirname, 'dist/'),
  },

  resolve: {
    alias: {
      '@images': path.join(__dirname, '../../fixtures/images'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: 'src/index.html',
      },

      js: {
        filename: 'js/[name].bundle.js',
      },

      css: {
        filename: 'css/[name].bundle.css',
      },

      //verbose: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|scss)/,
        use: ['css-loader', 'sass-loader'],
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

  optimization: {
    runtimeChunk: 'single', // extract runtime script from all modules
    splitChunks: {
      cacheGroups: {
        //chunks: 'all', // DON'T use default splitting, it's break the compilation process in the plugin
        app: {
          // split scripts only, because webpack compile all assets such as css, html, into JS module
          test: /\.(js|ts)$/,

          // note: when used splitChunks.cacheGroups, then use the `filename` option,
          // because output.chunkFilename is ignored
          //filename: 'js/[id].chunk.js',

          chunks: 'all', // <= important to split a bundle in many small chunks
          maxSize: 100, // <= important to split a bundle in many small chunks
          enforce: true, // <= important to split a bundle in many small chunks
        },
      },
    },
  },

  devServer: {
    //hot: false,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};
