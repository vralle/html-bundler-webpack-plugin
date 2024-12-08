const path = require('path');
const HtmlBundlerPlugin = require('@test/html-bundler-webpack-plugin');
const Handlebars = require('handlebars');

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
        //knownHelpersOnly: false,
        // define helpers manually
        helpers: {
          // WARNING: don't use the arrow function with `this` otherwise webpack compile `this` into `void 0`
          //bold: (options) => new Handlebars.SafeString(`<strong>${options.fn(this)}</strong>`),

          bold(options) {
            return new Handlebars.SafeString(`<strong>${options.fn(this)}</strong>`);
          },
        },
        partials: ['src/partials'],
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
