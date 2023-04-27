const AssetTrash = require('./AssetTrash');
const Resolver = require('./Resolver');

// supports for responsive-loader
const ResponsiveLoader = require('./Extras/ResponsiveLoader');

class AssetResource {
  /**
   * @param {Object} compiler The webpack compiler object.
   */
  static init(compiler) {
    // initialize responsible-loader module
    ResponsiveLoader.init(compiler);
  }

  /**
   * @param {Object} module The Webpack module.
   */
  static saveData(module) {
    const { buildInfo, resource } = module;
    let assetFile = buildInfo.filename;

    // resolve SVG filename with fragment, like './icons.svg#home'
    if (resource.indexOf('.svg#') > 0) {
      if (assetFile.indexOf('.svg#') > 0) {
        // fix save file name when filename in Webpack config is like '[name][ext][fragment]'
        const [file] = assetFile.split('#');
        buildInfo.filename = file;
      } else {
        // fix output asset filename used in HTML
        const [, fragment] = resource.split('#');
        assetFile += `#${fragment}`;
      }
    }

    const assetInfo = {
      resource,
      filename: assetFile,
      resolve: undefined,
    };

    if (ResponsiveLoader.findModuleLoaderOptions(module)) {
      assetInfo.filename = undefined;
      assetInfo.resolve = (issuerInfo) => ResponsiveLoader.getAsset(module, issuerInfo);

      // remove an original asset filename generated by Webpack, because responsive-loader generates own filename
      AssetTrash.add(assetFile);
    }

    // save the asset file that can be used in many files
    Resolver.addAsset(assetInfo);
  }
}

module.exports = AssetResource;
