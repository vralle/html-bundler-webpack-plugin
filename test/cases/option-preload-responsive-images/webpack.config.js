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
      '@scripts': path.join(__dirname, 'src/assets/scripts'),
      '@styles': path.join(__dirname, 'src/assets/styles'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      //verbose: true,

      entry: {
        // test the same template with diff output filenames
        index: {
          import: './src/views/pages/home/index.html',
          data: { title: 'EN Home' },
        },
        'lang/de/index': {
          import: './src/views/pages/home/index.html',
          data: { title: 'DE Home' },
        },
        'news/sport': './src/views/pages/news/sport/index.html?q=3',
      },

      css: {
        filename: 'assets/css/[name].bundle.css',
      },

      preload: [
        // preload responsive images
        {
          test: /\.(png|jpe?g|webp)\?.*size=100/,
          as: 'image',
        },
        {
          test: /\.(png|jpe?g|webp)\?.*size=300/,
          as: 'image',
        },
        {
          // note: allow match images with a query, like image.png?size=50, but not image.png?sizes[]=50,sizes[]=100
          test: /\.(png|jpe?g|webp)(?!\?sizes)/,
          as: 'image',
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },

      // default images
      {
        test: /\.(ico|svg|png)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },

      // responsive images
      {
        test: /\.(png|jpe?g|webp)/i, // note: allow match images with a query, like image.png?size=50
        //exclude: /.+(type=asset)/,
        type: 'asset/resource',
        use: {
          loader: 'responsive-loader',
          options: {
            // note: GitHub generate different hash as local test
            //name: 'assets/img/[name].[hash:8]-[width]w.[ext]',
            name: 'assets/img/[name]-[width]w.[ext]',
            sizes: [200], // default size for all images
          },
        },
      },
    ],
  },
};
