import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';

export default {
  plugins: [
    new HtmlBundlerPlugin({
      js: {
        inline: 'auto',
      },
      minify: {
        html5: false,
      },
    }),
  ],
};
