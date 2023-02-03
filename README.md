<div align="center">
    <h1>
        <img height="200" src="https://raw.githubusercontent.com/webdiscus/html-bundler-webpack-plugin/master/images/plugin-logo.png">
        <br>
        <a href="https://github.com/webdiscus/html-bundler-webpack-plugin">
        HTML Bundler Plugin for Webpack
        </a>
    </h1>
    <div>HTML Bundler Plugin is the right way to bundle all resources with your HTML templates</div>
</div>

---
[![npm](https://img.shields.io/npm/v/html-bundler-webpack-plugin?logo=npm&color=brightgreen "npm package")](https://www.npmjs.com/package/html-bundler-webpack-plugin "download npm package")
[![node](https://img.shields.io/node/v/html-bundler-webpack-plugin)](https://nodejs.org)
[![node](https://img.shields.io/github/package-json/dependency-version/webdiscus/html-bundler-webpack-plugin/peer/webpack)](https://webpack.js.org/)
[![codecov](https://codecov.io/gh/webdiscus/html-bundler-webpack-plugin/branch/master/graph/badge.svg?token=Q6YMEN536M)](https://codecov.io/gh/webdiscus/html-bundler-webpack-plugin)
[![node](https://img.shields.io/npm/dm/html-bundler-webpack-plugin)](https://www.npmjs.com/package/html-bundler-webpack-plugin)

The plugin make Webpack setup easily and intuitive.

This plugin allows to use an HTML file or a template as a starting point for collecting all the dependencies used in your web application.
This plugin does exactly what you want: automatically extracts JS, CSS, images, fonts from their sources loaded directly in HTML.
The generated HTML contains output hashed filenames of processed source files.

💡 **Highlights**

- An entry point is an HTML template.
- Source scripts and styles can be loaded directly in HTML using `<script>` and `<link>` tags.
- All JS and CSS files will be extracted from their sources loaded in HTML.
- You can inline JS, CSS, SVG, images **without additional plugins and loaders**.
- You can use a template engine, e.g. [EJS](https://ejs.co), [Nunjucks](https://mozilla.github.io/nunjucks/), [Handlebars](https://handlebarsjs.com) and others **without template loaders**.
- This plugin works like the [pug-plugin](https://github.com/webdiscus/pug-plugin) but the entry point is a `HTML` template.

How to easily build a multipage website with this plugin, see the [Webpack boilerplate](https://github.com/webdiscus/webpack-html-scss-boilerplate) used the `html-bundler-webpack-plugin`.

### Simple usage example

Add source scripts, styles, images directly to HTML using a relative path or a Webpack alias:

```html
<html>
<head>
  <!-- load source style here -->
  <link href="./style.scss" rel="stylesheet">
  <!-- load source script here -->
  <script src="./main.js" defer="defer"></script>
</head>
<body>
  <h1>Hello World!</h1>
  <!-- @images is the Webpack alias for the source images directory -->
  <img src="@images/logo.png">
</body>
</html>
```

The generated HTML contains hashed output filenames of processed source files:

```html
<html>
<head>
  <link href="/assets/css/style.05e4dd86.css" rel="stylesheet">
  <script src="/assets/js/main.f4b855d8.js" defer="defer"></script>
</head>
<body>
  <h1>Hello World!</h1>
  <img src="/assets/img/logo.58b43bd8.png">
</body>
</html>
```

Add the HTML templates in the `entry` option (syntax is identical to [Webpack entry](https://webpack.js.org/configuration/entry-context/#entry)):

```js
const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      '@images': path.join(__dirname, 'src/images'),
    },
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        // define HTML templates here
        index: 'src/views/home/index.html', // output dist/index.html
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.html/,
        loader: HtmlBundlerPlugin.loader, // HTML template loader
      },
      // ... other rules, e.g. for styles, images, fonts, etc.
    ],
  },
};
```


## Contents

1. [Features](#features)
2. [Install and Quick start](#install)
3. [Plugin options](#plugin-options)
   - [test](#option-test) (process only templates matching RegExp)
   - [entry](#option-entry) (define HTML templates)
   - [outputPath](#option-outputPath) (output path of HTML file)
   - [filename](#option-filename) (output filename of HTML file)
   - [css](#option-css) (output filename of extracted CSS)
   - [js](#option-js) (output filename of extracted JS)
   - [postprocess](#option-postprocess)
   - [extractComments](#option-extractComments)
   - [verbose](#option-verbose)
3. [Loader options](#loader-options)
   - [sources](#loader-option-sources)
   - [preprocessor](#loader-option-preprocessor) (for custom templates)
4. [Recipes](#recipes)
   - [How to use source images in HTML](#recipe-use-images-in-html)
   - [How to resize and generate responsive images](#recipe-responsive-images)
   - [How to preload source fonts in HTML](#recipe-preload-fonts)
   - [How to inline CSS in HTML](#recipe-inline-css)
   - [How to inline JS in HTML](#recipe-inline-js)
   - [How to inline SVG, PNG images in HTML](#recipe-inline-image)
   - [How to use a template engine](#recipe-template-engine)
   - [How to pass data into templates](#recipe-pass-data-to-templates)
   - [How to use HMR live reload](#recipe-hmr)

<a id="features" name="features" href="#features"></a>
## Features

- HTML template is the entry point for all resources (styles, scripts)
- extracts CSS from source style loaded in HTML via a `<link>` tag
- extracts JS from source script loaded in HTML via a `<script>` tag
- resolves source files in the CSS `url()` and in HTML attributes
- extracts resolved resources to output directory
- generated HTML contains hashed CSS, JS, images, fonts output filenames
- support the module types `asset/resource` `asset/inline` `asset`
- `inline CSS` in HTML
- `inline JavaScript` in HTML
- `inline image` as `base64 encoded` data-URL for PNG, JPG, etc. in HTML and CSS
- `inline SVG` as SVG tag in HTML
- `inline SVG` as `utf-8` data-URL in CSS
- support the `auto` publicPath
- enable/disable extraction of comments to `*.LICENSE.txt` file

Just one HTML bundler plugin replaces the most used functionality of the plugins and loaders:

| Package                                                                                   | Features                                                         | 
|-------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)                    | extract HTML and save in a file                                  |
| [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)     | extract CSS and save in a file                                   |
| [webpack-remove-empty-scripts](https://github.com/webdiscus/webpack-remove-empty-scripts) | remove empty JS files generated by the `mini-css-extract-plugin` |
| [html-loader](https://github.com/webpack-contrib/html-loader)                             | exports HTML as string                                           |
| [style-loader](https://github.com/webpack-contrib/style-loader)                           | inject CSS into the DOM                                          |
| [resolve-url-loader](https://github.com/bholloway/resolve-url-loader)                     | resolve relative url in CSS                                      |
| [svg-url-loader](https://github.com/bhovhannes/svg-url-loader)                            | encode SVG data-URL as utf8                                      |
| [posthtml-inline-svg](https://github.com/andrey-hohlov/posthtml-inline-svg)               | inline SVG icons in HTML                                         |


<a id="install" name="install" href="#install"></a>
## Install and Quick start

Install the `html-bundler-webpack-plugin`:
```bash
npm install html-bundler-webpack-plugin --save-dev
```

Install additional packages for styles:
```bash
npm install css-loader sass sass-loader --save-dev
```

Change your `webpack.config.js` according to the following minimal configuration:

```js
const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        // define HTML files here
        index: 'src/views/home/index.html',  // output dist/index.html
        'pages/about': 'src/views/about/index.html', // output dist/pages/about.html
        // ...
      },
      js: {
        // output filename of extracted JS from source script loaded in HTML via `<script>` tag
        filename: 'assets/js/[name].[contenthash:8].js',
      },
      css: {
        // output filename of extracted CSS from source style loaded in HTML via `<link>` tag
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader, //  HTML template loader
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
};
```


> **Note**
> 
> Since the version `0.9.0`, you can define HTML templates in the `entry` option of the plugin.
> If is used the `entry` option of the plugin, then the origin Webpack `entry` option should be undefined.

---

<a id="plugin-options" name="plugin-options" href="#plugin-options"></a>
## Plugin options

<a id="option-test" name="option-test" href="#option-test"></a>
### `test`
Type: `RegExp` Default: `/\.html$/`<br>
The `test` option allows то handel only those entry points that match their source filename.

For example, if you has `*.html` and `*.hbs` entry points, then you can set the option to match all needed files: `test: /\.(html|hbs)$/`.


<a id="option-entry" name="option-entry" href="#option-entry"></a>
### `entry`
Type: `object` is identical to [Webpack entry](https://webpack.js.org/configuration/entry-context/#entry)
plus additional `data` property.

Define your HTML files or templates in the entry option.

HTML is a starting point for collecting all the dependencies used in your web application.
Specify source scripts (JS, TS) and styles (CSS, SCSS, etc.) directly in HTML.
The plugin automatically extracts JS, CSS from their sources specified in HTML.

#### Simple syntax

The key of an entry object is the `output file` w/o extension, relative by the [`outputPath`](#option-outputPath) option.\
The value is the `source file`, absolute or relative by the Webpack config file. 

```js
{
  entry: {
    index: 'src/views/home/index.html', // => dist/index.html
    'pages/about/index': 'src/views/about.html', // => dist/pages/about/index.html
  },
}
```

#### Advanced syntax

The entry value might be an object:

```ts
type entryValue = {
  import: string,
  filename: string
  data: object,
}
```

- `import` - a source file, absolute or relative by the Webpack config file
- `filename` - an output file, relative by the 'outputPath' option
- `data` - an object with variables passed into [`preprocessor`](#loader-option-preprocessor) to render a template

Usage example:

```js
{
  entry: {
    'pages/about/index': { // output file as the key
      import: 'src/views/about.html', // source template file
      data: {
        title: 'About',
      }
    },

    contact: {
      import: 'src/views/contact.html',
      filename: 'pages/contact/index.html', // output file as the 'filename' property
    },
  },
}
```

<a id="option-outputPath" name="option-outputPath" href="#option-outputPath"></a>
### `outputPath`
Type: `string` Default: `webpack.options.output.path`<br>
The output directory for processed file. This directory can be relative by `webpack.options.output.path` or absolute.


<a id="option-filename" name="option-filename" href="#option-filename"></a>
### `filename`
Type: `string | Function` Default: `[name].html`<br>
The output filename relative by the [`outputPath`](#option-outputPath) option.

- If type is `string` then following substitutions (see [output.filename](https://webpack.js.org/configuration/output/#template-strings) for chunk-level) are available in template string:
  - `[id]` The ID of the chunk.
  - `[name]` Only filename without extension or path.
  - `[contenthash]` The hash of the content.
  - `[contenthash:nn]` The `nn` is the length of hashes (defaults to 20).
- If type is `Function` then following arguments are available in the function:
  - `@param {PathData} pathData` has the useful properties (see the [type PathData](https://webpack.js.org/configuration/output/#outputfilename)):
    - `pathData.filename` the full path to source file
    - `pathData.chunk.name` the name of entry key
  - `@param {AssetInfo} assetInfo` Mostly this object is empty.
  - `@return {string}` The name or template string of output file.


<a id="option-css" name="option-css" href="#option-css"></a>
### `css`
Type: `Object`\
Default properties:
```js
{
  test: /\.(css|scss|sass|less|styl)$/,
  filename: '[name].css',
  outputPath: null,
  verbose: false,
}
```

- `test` - an RegEpx to process all source styles that pass test assertion
- `filename` - an output filename of extracted CSS. Details see by [filename option](#option-filename).\
- `outputPath` - an output path of extracted CSS. Details see by [outputPath option](#option-outputPath).
- `verbose` - enable/disable display process information for styles

This is the option to extract CSS from a style source file specified in the HTML tag:
```html
<link href="./style.scss" rel="stylesheet">
```

> **Warning**
>
> Don't import source styles in JavaScript! Styles must be specified directly in HTML.

The default CSS output filename is `[name].css`. 
You can specify your own filename using [webpack filename substitutions](https://webpack.js.org/configuration/output/#outputfilename):

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      css: {
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
  ],
};
```

The `[name]` is the base filename of a loaded style.
For example, if source file is `style.scss`, then output filename will be `assets/css/style.1234abcd.css`.\
If you want to have a different output filename, you can use the `filename` options as the [function](https://webpack.js.org/configuration/output/#outputfilename).

> **Warning**
>
> Don't use `mini-css-extract-plugin` or `style-loader`, they are not required more.\
> The `html-bundler-webpack-plugin` extracts CSS much faster than other plugins and resolves all asset URLs in CSS, therefore the `resolve-url-loader` is redundant too.


<a id="option-js" name="option-js" href="#option-js"></a>
### `js`
Type: `Object`\
Default properties:
```js
{
  filename: '[name].js', 
  outputPath: null,
  verbose: false,
}
```

- `filename` - an output filename of extracted JS. Details see by [filename option](#option-filename).\
- `outputPath` - an output path of extracted CSS. Details see by [outputPath option](#option-outputPath).
- `verbose` - enable/disable display process information for styles

The `test` property absent because all JS files specified in `<script>` tag are automatically detected.

This is the option to extract JS from a script source file specified in the HTML tag:
```html
<script src="./main.js"></script>
```

The default JS output filename is `[name].js`. 
You can specify your own filename using [webpack filename substitutions](https://webpack.js.org/configuration/output/#outputfilename):

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      js: {
        filename: 'assets/js/[name].[contenthash:8].js',
      },
    }),
  ],
};
```

The `[name]` is the base filename script.
For example, if source file is `main.js`, then output filename will be `assets/js/main.1234abcd.js`.\
If you want to have a different output filename, you can use the `filename` options as the [function](https://webpack.js.org/configuration/output/#outputfilename).


<a id="option-postprocess" name="option-postprocess" href="#option-postprocess"></a>
### `postprocess`
Type:
```ts
type postprocess = (
  content: string,
  info: ResourceInfo,
  compilation: Compilation,
) => string|null;

type ResourceInfo = {
  verbose: boolean,
  isEntry: boolean,
  filename: 
    | string
    | ((pathData: PathData) => string),
  sourceFile: string,
  outputPath: string,
  assetFile: string,
};
```

Default: `null`<br>

Called after the Webpack compilation.

The `postprocess` have the following arguments:

- `content: string` - a content of processed file
- `info: ResourceInfo` - an info about current file
- `compilation: Compilation` - the Webpack [compilation object](https://webpack.js.org/api/compilation-object/)

If return `null` then the content processed via Webpack is ignored and will be saved a result from the loader.

The `ResourceInfo` have the following properties:

- `verbose: boolean` - whether information should be displayed
- `isEntry: boolean` - if is `true`, the resource is the entry point, otherwise is a resource loaded in the entry point
- `filename: string|function` - a filename of the resource, see [filename](https://webpack.js.org/configuration/output/#outputfilename)
- `sourceFile: string` - a full path of the source file
- `outputPath: string` - a full path of the output directory
- `assetFile: string` - an output asset file relative by outputPath


<a id="option-extractComments" name="option-extractComments" href="#option-extractComments"></a>
### `extractComments`
Type: `boolean` Default: `false`<br>
Enable / disable extraction of comments to `*.LICENSE.txt` file.

When using `splitChunks` optimization for node modules containing comments,
Webpack extracts those comments into a separate text file.
By default, the plugin don't create such unwanted text files.
But if you want to extract files like `*.LICENSE.txt`, set this option to `true`:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      extractComments: true,
    }),
  ],
};
```


<a id="option-verbose" name="option-verbose" href="#option-verbose"></a>
### `verbose`
Type: `boolean` Default: `false`<br>
Display information about all processed files.

---

<a id="loader-options" name="loader-options" href="#loader-options"></a>
## Loader options

<a id="loader-option-sources" name="loader-option-sources" href="#loader-option-sources"></a>
### `sources`
Type:
```ts
type sources =
  | boolean
  | Array<{
      tag?: string;
      attributes?: Array<string>;
      filter?: ({
        tag: string,
        attribute: string,
        value: string,
        attributes: string,
        resourcePath: string
      }) => boolean|undefined;
    }>;
```

Default: `true`<br>

By default, resolves source files in the following tags and attributes:

| Tag      | Attributes                                                                            |
|----------|---------------------------------------------------------------------------------------|
| `link`   | `href` (for `type="text/css"` or `rel="stylesheet"`) `imagesrcset` (for `as="image"`) |
| `script` | `src`                                                                                 |
| `img`    | `src` `srcset`                                                                        |
| `input`  | `src` (for `type="image"`)                                                            |
| `source` | `src` `srcset`                                                                        |
| `audio`  | `src`                                                                                 |
| `track`  | `src`                                                                                 |
| `video`  | `src` `poster`                                                                        |
| `object` | `data`                                                                                |

To disable the processing of all attributes, set the `sources` option as `false`.

> **Note**
> 
> Automatically are processed only attributes containing a relative path or Webpack alias:
> - `src="./image.png"` - a relative path to local directory
> - `src="../../assets/image.png"` - a relative path to parent directory
> - `src="@images/image.png"` - an image directory as Webpack alias
> 
> Url values are not processed:
> - `src="https://example.com/img/image.png"`
> - `src="//example.com/img/image.png"`
> - `src="/img/image.png"`
> 
> Others not file values are ignored, e.g.:
> - `src="data:image/png; ..."`
> - `src="javascript: ..."`

The `filter` is called for all attributes of the tag defined as defaults and in `sources` option.
The argument is an object containing the properties:
- `tag: string` - a name of the HTML tag
- `attribute: string` - a name of the HTML attribute
- `value: string` - a value of the HTML attribute
- `attributes: string` - all attributes of the tag
- `resourcePath: string` - a path of the HTML template

The processing of an attribute can be ignored by returning `false`.

Examples of using argument properties:
```js
{
  tag: 'img',
  // use the destructuring of variables from the object argument  
  filter: ({ tag, attribute, value, attributes, resourcePath }) => {
    if (attribute === 'src') return false;
    if (value.endsWith('.webp')) return false;
    if ('srcset' in attributes && attributes['srcset'] === '') return false;
    if (resourcePath.indexOf('example')) return false;
    // otherwise return 'true' or nothing to allow processing
  },
}
```

The default sources can be extended with new tags and attributes.

For example, add the processing of the `data-src` and `data-srcset` attributes to the `img` tag:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader,
        options: {
          sources: [
            {
              tag: 'img',
              attributes: ['data-src', 'data-srcset'],
            }
          ],
        },
      },
    ],
  },
};
```

You can use the `filter` function to allow the processing only specific attributes.

For example, allow processing only for images in `content` attribute of the `meta` tag:

```html
<html>
<head>
  <!-- ignore the attribute via filter -->
  <meta name="theme-color" content="#ffffff">
  <!-- resolve the 'content' attribute if 'name' containing special values  -->
  <meta name="twitter:image" content="./image.png">
  <meta name="logo" content="./logo.png">
</head>
<body>
  <!-- resolve 'src' attribute containing relative path -->
  <img src="./image.png">
</body>
</html>
```

_webpack.config.js_
```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader,
        options: {
          sources: [
            {
              tag: 'meta',
              attributes: ['content'],
              filter: ({ attributes }) => {
                const allowedNames = ['twitter:image', 'logo'];
                if ('name' in attributes && allowedNames.indexOf(attributes.name) < 0) {
                  return false;
                }
              },
            }
          ],
        },
      },
    ],
  },
};
```

The filter can disable an attribute of a tag.

For example, disable the processing of default attribute `srcset` of the `img` tag:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader,
        options: {
          sources: [
            {
              tag: 'img',
              filter: ({ attribute }) => attribute !== 'srcset',
            }
          ],
        },
      },
    ],
  },
};
```


<a id="loader-option-preprocessor" name="loader-option-preprocessor" href="#loader-option-preprocessor"></a>
### `preprocessor`
Type:
```ts
type preprocessor = (
  content: string,
  loaderContext: LoaderContext
) => HTMLElement;
```

Default: `undefined`<br>

The `content` argument is the raw content of a file.\
The `loaderContext` argument is an object contained useful properties:
- `mode: string` - a Webpack mode: `production`, `development`, `none`
- `rootContext: string` - a path to Webpack context
- `resource: string` - a template file, including query
- `resourcePath: string` - a template file
- `data: object|null` - variables passed form [`entry`](#option-entry)

Complete API see by the [Loader Context](https://webpack.js.org/api/loaders/#the-loader-context).

The preprocessor is called for each entry file, before handling of the content. 
This function can be used to compile the template with a template engine,
such as [EJS](https://ejs.co), [Handlebars](https://handlebarsjs.com), [Nunjucks](https://mozilla.github.io/nunjucks), etc.

For example, set a variable in the template
_index.html_
```html
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

_Webpack config_
```js
const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  output: {
    path: path.join(__dirname, 'dist/'),
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: { // => dist/index.html
          import: './src/views/index.html',
          data: {
            title: 'Homepage',
          }
        },
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader,
        options: {
          preprocessor: (content, { data }) => {
            // you can use here a template engine like EJS, Handlebars, Nunjucks, etc 
            return content.replace('{{ title }}', data.title);
          },
        },
      },
    ],
  },
};

```

See the example [How to use a template engine](#recipe-template-engine).

---

<a id="recipe-use-images-in-html" name="recipe-use-images-in-html" href="#recipe-use-images-in-html"></a>
## How to use source images in HTML

Add to Webpack config the rule:
```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|ico)/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/img/[name].[hash:8][ext]',
      },
    },
  ],
}
```

Add a source file using a relative path or Webpack alias in HTML:
```html
<html>
<head>
  <link href="./favicon.ico" rel="icon" />
</head>
<body>
  <img src="./apple.png" srcset="./apple1.png 320w, ./apple2.png 640w" alt="apple">
  <picture>
    <source srcset="./fig1.jpg, ./fig2.jpg 320w, ./fig3.jpg 640w">
  </picture>
</body>
</html>
```

The generated HTML contains hashed output images filenames:
```html
<html>
<head>
  <link href="/assets/img/favicon.05e4dd86.ico" rel="icon" />
</head>
<body>
  <img src="/assets/img/apple.f4b855d8.png" srcset="/assets/img/apple1.855f4bd8.png 320w, /assets/img/apple2.d8f4b855.png 640w" alt="apple">
  <picture>
    <source srcset="/assets/img/fig1.605e4dd8.jpg, /assets/img/fig2.8605e4dd.jpg 320w, /assets/img/fig3.e4605dd8.jpg 640w">
  </picture>
</body>
</html>
```

<a id="recipe-responsive-images" name="recipe-responsive-images" href="#recipe-responsive-images"></a>
## How to resize and generate responsive images

To resize or generate responsive images is recommended to use the [responsive-loader](https://github.com/dazuaz/responsive-loader).

Install additional packages:
```
npm i -D responsive-loader sharp
```

To resize an image use the query parameter `size`:

```html
<!-- resize source image to max. 640px -->
<img src="./image.png?size=640">
```

To generate responsible images use in `srcset` attribute the query parameter `sizes` als `JSON5` to avoid parsing error, 
because many images must be separated by commas `,` but we use the comma to separate sizes for one image:
```html
<!-- responsible images with different sizes: 320px, 480px, 640px -->
<img src="./image.png?size=480"
     srcset="./image.png?{sizes:[320,480,640]}">
```

You can convert source image to other output format. 
For example, we have original image 2000px width as PNG and want to resize to 640px and save as WEBP:

```html
<img src="./image.png?size=640&format=webp">
```

You can create a small inline image placeholder. To do this, use the following query parameters:
- `placeholder=true` - enable to generate the placeholder
- `placeholderSize=35` - the size of the generating placeholder
- `prop=placeholder` - the plugin-specific `prop` parameter retrieves the property from the object generated by `responsive-loader`

```html
<img src="./image.png?placeholder=true&placeholderSize=35&prop=placeholder"
     srcset="./image.png?{sizes:[320,480,640]}">
```

The generated HTML:
```html
<img src="data:image/png;base64,iVBORw0K ..."
     srcset="/img/image-320w.png 320w,/img/image-480w.png 480w,/img/image-640w.png 640w">
```

Add to Webpack config the rule for responsive images:
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|webp)$/i,
        type: 'asset/resource',
        use: {
          loader: 'responsive-loader',
          options: {
            // output filename of images, e.g. dist/assets/img/image-640w.png
            name: 'assets/img/[name]-[width]w.[ext]',
            sizes: [640], // max. image size, if 'size' query is not used
          },
        },
      },
      // ... other loaders
    ],
  },
};

```

<a id="recipe-preload-fonts" name="recipe-preload-fonts" href="#recipe-preload-fonts"></a>
## How to preload source fonts in HTML

Add to Webpack config the rule:
```js
module: {
  rules: [
    {
      test: /\.(eot|ttf|woff|woff2)/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[name][ext]',
      },
    },
  ],
}
```

Add a source file using a relative path or Webpack alias in HTML:
```html
<html>
<head>
  <link href="./font1.woff2" rel="preload" as="font" type="font/woff2" />
  <link href="./font2.woff2" rel="preload" as="font" type="font/woff2" />
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

The generated HTML contains output fonts filenames:
```html
<html>
<head>
  <link href="/assets/fonts/font1.woff2" rel="preload" as="font" type="font/woff2" />
  <link href="/assets/fonts/font2.woff2" rel="preload" as="font" type="font/woff2" />
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

> **Note**
> 
> You don't need a plugin to copy files from source directory to public.


<a id="recipe-inline-css" name="recipe-inline-css" href="#recipe-inline-css"></a>
## How to inline CSS in HTML

For example, the _style.scss_:
```scss
$color: red;
h1 {
  color: $color;
}
```

Add the `?inline` query to the source filename which you want to inline:
```html
<html>
<head>
  <!-- load style as file -->
  <link href="./main.scss" rel="stylesheet" />
  <!-- inline style -->
  <link href="./style.scss?inline" rel="stylesheet" />
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

The generated HTML contains inline CSS already processed via Webpack:

```html
<html>
<head>
  <!-- load style as file -->
  <link href="/assets/css/main.05e4dd86.css" rel="stylesheet">
  <!-- inline style -->
  <style>
    h1{color: red;}
  </style>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

> **Note**
>
> To enable source map in inline CSS set the Webpack option `devtool`.

<a id="recipe-inline-js" name="recipe-inline-js" href="#recipe-inline-js"></a>
## How to inline JS in HTML

For example, the _script.js_:
```js
console.log('Hello JS!');
```

Add the `?inline` query to the source filename which you want to inline:
```html
<html>
<head>
  <!-- load script as file -->
  <script src="./main.js" defer="defer"></script>
  <!-- inline script -->
  <script src="./script.js?inline"></script>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

The generated HTML contains inline JS already compiled via Webpack:

```html
<html>
<head>
  <!-- load style as file -->
  <script src="assets/js/main.992ba657.js" defer="defer"></script>
  <!-- inline script -->
  <script>
    (()=>{"use strict";console.log("Hello JS!")})();
  </script>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

> **Note**
>
> If Webpack is started as `serve` or `watch`,
> the inlined JS code will contain additional HMR code.
> Don't worry it is ok, so works Webpack `live reload`.
>
> To enable source map in inline JS set the Webpack option `devtool`.

<a id="recipe-inline-image" name="recipe-inline-image" href="#recipe-inline-image"></a>
## How to inline SVG, PNG images in HTML

You can inline the images in two ways:
- force inline image using `?inline` query
- auto inline by image size

Add to Webpack config the rule:
```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|svg|webp|ico)$/i,
      oneOf: [
        // inline image using `?inline` query
        {
          resourceQuery: /inline/,
          type: 'asset/inline',
        },
        // auto inline by image size
        {
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 1024,
            },
          },
          generator: {
            filename: 'assets/img/[name].[hash:8][ext]',
          },
        },
      ],
    },
  ],
}
```

<a id="recipe-template-engine" name="recipe-template-engine" href="#recipe-template-engine"></a>
## How to use a template engine

Using the [preprocessor](#loader-option-preprocessor) you can compile the template with a template engine such as:
- [EJS](https://ejs.co), 
- [Handlebars](https://handlebarsjs.com)
- [Nunjucks](https://mozilla.github.io/nunjucks/), 

> **Note**
> 
> For Pug templates use the [pug-plugin](https://github.com/webdiscus/pug-plugin).
> This plugin works on the same codebase but has additional Pug-specific features.

For example, using the Handlebars templating engine, there is an
_index.hbs_
```html
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  <h1>{{ headline }}</h1>
  <div>
    <p>{{ firstname }} {{ lastname }}</p>
  </div>
</body>
</html>
```

Add the `preprocessor` option to compile the template.

```js
const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const Handlebars = require('handlebars');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/'),
  },

  plugins: [
    new HtmlBundlerPlugin({
      test: /\.(html|hbs)$/, // add the option to match *.hbs files in entry, default is /\.html$/
      
      entry: {
        index: {
          import: './src/views/home/index.hbs',
          // pass data into the preprocessor
          data: {
            title: 'My Title',
            headline: 'Breaking Bad',
            firstname: 'Walter',
            lastname: 'Heisenberg',
          },
        },
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(html|hbs)$/, // must match the files specified in the entry
        loader: HtmlBundlerPlugin.loader,
        options: {
          // add the preprocessor function to compile *.hbs files to HTML
          preprocessor: (content, { data }) => Handlebars.compile(content)(data),
        },
      },
    ],
  },
};

```


<a id="recipe-pass-data-to-templates" name="recipe-pass-data-to-templates" href="#recipe-pass-data-to-templates"></a>
## How to pass data into templates

You can pass variables into template using a template engine, e.g. [Handlebars](https://handlebarsjs.com).
For multiple page configuration, better to use the [Nunjucks](https://mozilla.github.io/nunjucks) templating engine maintained by Mozilla.

For example, you have several pages with variables.\
Both pages have the same layout _src/views/layouts/default.html_
```html
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
  <!-- block for specific page styles -->
  {% block styles %}{% endblock %}
  <!-- block for specific page scripts -->
  {% block scripts %}{% endblock %}
</head>
<body>
  <main class="main-content">
    <!-- block for specific page content -->
    {% block content %}{% endblock %}
  </main>
</body>
</html>
```

_src/views/pages/home/index.html_
```html
{% extends "src/views/layouts/default.html" %}

{% block styles %}
  <!-- load source style -->
  <link href="./home.scss" rel="stylesheet">
{% endblock %}

{% block scripts %}
  <!-- load source script -->
  <script src="./home.js" defer="defer"></script>
{% endblock %}

{% block content %}
  <h1>{{ filmTitle }}</h1>
  <p>Location: {{ location }}</p>
  <!-- @images is the Webpack alias for the source images directory -->
  <img src="@images/{{ imageFile }}">
{% endblock %}
```

_src/views/pages/about/index.html_
```html
{% extends "src/views/layouts/default.html" %}

{% block styles %}
  <link href="./about.scss" rel="stylesheet">
{% endblock %}

{% block scripts %}
  <script src="./about.js" defer="defer"></script>
{% endblock %}

{% block content %}
  <h1>Main characters</h1>
  <ul>
  {% for item in actors %}
    <li class="name">{{ item.firstname }} {{ item.lastname }}</li>
  {% endfor %}
  </ul>
{% endblock %}
```

_Webpack config_
```js
const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const Nunjucks = require('nunjucks');

// Note: 
// If your pages have a lot of variables, it's a good idea to define them separately 
// to keep the configuration clean and clear.
const entryData = {
  // variables for home page
  home: {
    title: 'Home',
    filmTitle: 'Breaking Bad',
    location: 'Albuquerque, New Mexico',
    imageFile: 'map.png',
  },
  // variables for about page
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
        // define your templates here
        index: { // => dist/index.html
          import: 'src/views/pages/home/index.html',
          data: entryData.home,
        },
        about: { // => dist/about.html
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
      // templates
      {
        test: /\.html/,
        loader: HtmlBundlerPlugin.loader, //  HTML template loader
        options: {
          preprocessor: (content, { data }) => {
            // render template with page-specific variables defined in entry
            return Nunjucks.renderString(content, data);
          },
        },
      },
      // styles
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      // images
      {
        test: /\.(png|svg|jpe?g|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
    ],
  },
};

```

The generated _dist/index.html_
```html
<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <link href="assets/css/home.2180238c.css" rel="stylesheet">
  <script src="assets/js/home.790d746b.js" defer="defer"></script>
</head>
<body>
  <main class="main-content">
    <h1>Breaking Bad</h1>
    <p>Breaking Bad is an American crime drama</p>
    <p>Location: Albuquerque, New Mexico</p>
    <img src="assets/img/map.697ef306.png" alt="location" />
  </main>
</body>
</html>
```

The generated _dist/about.html_
```html
<!DOCTYPE html>
<html>
<head>
  <title>About</title>
  <link href="assets/css/about.2777c101.css" rel="stylesheet">
  <script src="assets/js/about.1.c5e03c0e.js" defer="defer"></script>
</head>
<body>
  <main class="main-content">
    <h1>Main characters</h1>
    <ul>
      <li class="name">Walter White, &quot;Heisenberg&quot;</li>
      <li class="name">Jesse Pinkman</li>
    </ul>
  </main>
</body>
</html>
```

<a id="recipe-hmr" name="recipe-hmr" href="#recipe-hmr"></a>
## HMR live reload

To enable live reload by changes any file add in the Webpack config the `devServer` option:
```js
module.exports = {
  // enable HMR with live reload
  devServer: {
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
```

> **Note**
>
> Live reload works only if in HTML used a JS file. This is specific of Webpack.
> If your HTML has not a JS, then create one empty JS file, e.g. `hmr.js` and add it in the HTML:
> ```html
> <script src="./hmr.js"></script>
> ```

---

## Also See

- [ansis][ansis] - The Node.js lib for ANSI color styling of text in terminal
- [pug-loader][pug-loader] The Pug loader for Webpack
- [pug-plugin][pug-plugin] The Pug plugin for Webpack

## License

[ISC](https://github.com/webdiscus/html-bundler-webpack-plugin/blob/master/LICENSE)

[ansis]: https://github.com/webdiscus/ansis
[pug-loader]: https://github.com/webdiscus/pug-loader
[pug-plugin]: https://github.com/webdiscus/pug-plugin
