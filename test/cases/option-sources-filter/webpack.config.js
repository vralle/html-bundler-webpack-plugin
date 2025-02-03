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
          filter: ({ tag, attribute, value, attributes, resourcePath }) => {
            // resolves the 'content' only if the 'name' attribute is one of
            const allowedNames = ['twitter:image', 'msapplication-TileImage'];

            // resolves the 'content' only if the 'property' attribute is one of
            const allowedProperties = ['og:image', 'og:image:url'];

            // resolves the 'content' only if the 'itemprop' attribute is one of
            const allowedItemprops = ['logo', 'screenshot'];

            if (
              ('name' in attributes && allowedNames.indexOf(attributes['name']) < 0) ||
              ('property' in attributes && allowedProperties.indexOf(attributes['property']) < 0) ||
              ('itemprop' in attributes && allowedItemprops.indexOf(attributes['itemprop']) < 0)
            ) {
              return false;
            }
          },
        },

        // add filter to default tag
        {
          tag: 'img',
          filter: ({ tag, attribute, value, parsedValue, attributes, resourcePath }) => {
            if (attribute === 'src' && !value.endsWith('lemon.png')) return false;
            if (attribute === 'srcset' && !parsedValue.find((item) => item.endsWith('fig3.png'))) return false;
          },
        },

        {
          tag: 'custom-img',
          attributes: ['data-src-one', 'data-src-two'],
          filter: ({ tag, attribute, value, attributes, resourcePath }) => {
            // ignore resolving all attributes except one that name is in the 'data-resolve-attr'
            if (attribute !== attributes['data-resolve-attr']) {
              return false;
            }
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
    ],
  },
};
