const path = require('path');
const { encodeReservedChars } = require('../../Utils');
const { isWin, isUrl, pathToPosix } = require('../../../Common/Helpers');
const Resolver = require('../../Resolver');
const LoaderFactory = require('../../LoaderFactory');

const scriptExtensionRegexp = /\.js[a-z\d]*$/i;
const isRequireableScript = (file) => !path.extname(file) || scriptExtensionRegexp.test(file);

/**
 * Whether the node value contains the require() function.
 *
 * @param {string} value
 * @return {boolean}
 */
const isRequired = (value) => value != null && typeof value === 'string' && value.indexOf('require(') > -1;

/**
 * Whether the node attribute belongs to style.
 *
 * @param {Array<name: string, val: string>} item
 * @return {boolean}
 */
const isStyle = (item) => item.name === 'rel' && item.val.indexOf('stylesheet') > -1;

/**
 * Resolve function names.
 * It will be defined before the compilation pug into the template js function.
 *
 * @type {{default: string, expression: string, style: string, asset: string, script: string}}
 */
const requireTypes = {
  default: '__LOADER_REQUIRE__', // can load requireable file, e.g. raw json file in pug variable
  asset: '__LOADER_REQUIRE_ASSET__',
  script: '__LOADER_REQUIRE_SCRIPT__',
  style: '__LOADER_REQUIRE_STYLE__',
  expression: '__LOADER_REQUIRE_EXPRESSION__', // resolve required file in code, not in tag attributes
};

/**
 * The mapping of resolve function names to callable functions.
 * Used by calling in VM during the compilation pug into the template js function.
 *
 * @return {{__LOADER_REQUIRE_SCRIPT__: (function(string, string): string), __LOADER_REQUIRE_STYLE__: (function(string, string): string), __LOADER_REQUIRE__: ((function(string, string): string)|*), __LOADER_REQUIRE_EXPRESSION__: ((function(string, string): string)|*), __LOADER_REQUIRE_ASSET__: (function(string, string): string)}}
 */
const LoaderResolvers = function (pluginCompiler) {
  const resolver = LoaderFactory.getResolver(pluginCompiler);

  return {
    require: require,

    /**
     * Resolve the resource file after compilation of source code.
     * Called in vm.Script by rendering.
     *
     * @param {string} file The required file.
     * @param {string} issuer The issuer of required file.
     * @return {string}
     */
    __LOADER_REQUIRE__(file, issuer) {
      let resolvedFile = resolver.resolve(file, issuer);

      if (isUrl(resolvedFile)) return resolvedFile;

      if (isRequireableScript(resolvedFile)) return require(resolvedFile);

      resolvedFile = encodeReservedChars(resolvedFile);

      return `require('${resolvedFile}')`;
    },

    /**
     * Resolve the asset file after compilation of source code.
     * Called in vm.Script by rendering.
     *
     * @param {string} file The required file.
     * @param {string} issuer The issuer of required file.
     * @return {string}
     */
    __LOADER_REQUIRE_ASSET__(file, issuer) {
      let resolvedFile = resolver.resolve(file, issuer);

      if (isUrl(resolvedFile)) return resolvedFile;

      resolvedFile = encodeReservedChars(resolvedFile);

      return `require('${resolvedFile}')`;
    },

    /**
     * Resolve the script file after compilation of source code.
     * Called in vm.Script by rendering.
     *
     * @param {string} file The required file.
     * @param {string} issuer The issuer of required file.
     * @return {string}
     */
    __LOADER_REQUIRE_SCRIPT__(file, issuer) {
      let resolvedFile = resolver.resolve(file, issuer, Resolver.types.script);

      if (isUrl(resolvedFile)) return resolvedFile;

      resolvedFile = encodeReservedChars(resolvedFile);

      return `require('${resolvedFile}')`;
    },

    /**
     * Resolve the style file after compilation of source code.
     * Called in vm.Script by rendering.
     *
     * @param {string} file The required file.
     * @param {string} issuer The issuer of required file.
     * @return {string}
     */
    __LOADER_REQUIRE_STYLE__(file, issuer) {
      let resolvedFile = resolver.resolve(file, issuer, Resolver.types.style);

      if (isUrl(resolvedFile)) return resolvedFile;

      resolvedFile = encodeReservedChars(resolvedFile);

      return `require('${resolvedFile}')`;
    },

    /**
     * Resolve the required file in a code, not in a tag attribute.
     * Called in vm.Script by rendering.
     *
     * @param {string} file The required file.
     * @param {string} issuer The issuer of required file.
     * @return {string}
     */
    __LOADER_REQUIRE_EXPRESSION__(file, issuer) {
      let resolvedFile = resolver.resolve(file, issuer);

      if (isUrl(resolvedFile)) return resolvedFile;

      if (isRequireableScript(resolvedFile)) return require(resolvedFile);

      resolvedFile = encodeReservedChars(resolvedFile);

      return `\\u0027 + require(\\u0027${resolvedFile}\\u0027) + \\u0027`;
    },
  };
};

/**
 * The pug plugin to resolve the path for the extends, include, require.
 *
 * @param {Compiler} pluginCompiler
 * @return {{setMode: (function(string): void), resolve: (function(string, string, {}): string), preCodeGen: (function({}): *)}}
 */
const ResolvePlugin = function (pluginCompiler) {
  const resolver = LoaderFactory.getResolver(pluginCompiler);
  const dependency = LoaderFactory.getDependency(pluginCompiler);

  return {
    mode: '',
    lastTag: '',

    /**
     * Resolve the filename for the extends, include, raw include.
     *
     * @api Pug plugin method
     *
     * @param {string} filename The extends/include filename in template.
     * @param {string} templateFile The absolute template filename.
     * @param {{}} options The options of pug compiler.
     * @return {string}
     */
    resolve(filename, templateFile, options) {
      const file = resolver.resolve(filename.trim(), templateFile.trim(), Resolver.types.include);

      // add included file as dependency to watch
      dependency.addFile(file);

      return file;
    },

    /**
     * Traverse all Pug nodes and resolve filename in each node.
     *
     * @api Pug plugin method
     *
     * @note: This is the implementation of the 'pug-walk' logic without a recursion, up to x2.5 faster.
     *
     * @param {{}} tree The parsed tree of the pug template.
     * @return {{}}
     */
    preCodeGen(tree) {
      const stack = [tree];
      let ast, lastIndex, i;

      while ((ast = stack.pop())) {
        while (true) {
          this.resolveNode(ast);

          switch (ast.type) {
            case 'Tag':
            case 'Code':
            case 'Case':
            case 'Mixin':
            case 'When':
            case 'While':
            case 'EachOf':
              if (ast.block) stack.push(ast.block);
              break;
            case 'Each':
              if (ast.block) stack.push(ast.block);
              if (ast.alternate) stack.push(ast.alternate);
              break;
            case 'Conditional':
              if (ast.consequent) stack.push(ast.consequent);
              if (ast.alternate) stack.push(ast.alternate);
              break;
            default:
              break;
          }

          if (!ast.nodes || ast.nodes.length === 0) break;

          lastIndex = ast.nodes.length - 1;
          for (i = 0; i < lastIndex; i++) {
            stack.push(ast.nodes[i]);
          }
          ast = ast.nodes[lastIndex];
        }
      }

      return tree;
    },

    /**
     * @param {string} mode
     */
    setMode(mode) {
      this.mode = mode;
    },

    /**
     * Resolve resource file in a tag attribute.
     *
     * @param {string} value The resource value or code included require().
     * @param {string} issuer The filename of the template where resolves the resource.
     * @param {Resolver.types} type The filename of the template where resolves the resource.
     * @return {string}
     */
    requireExpression(value, issuer, type = Resolver.types.default) {
      const [, requiredFile] = /require\((.+?)(?=\))/.exec(value) || [];
      const file = requiredFile || value;
      let expression = file;

      if (isWin) issuer = pathToPosix(issuer);

      switch (this.mode) {
        case 'compile':
          let interpolatedValue = resolver.interpolate(file, issuer, type);
          if (isWin) interpolatedValue = pathToPosix(interpolatedValue);
          expression = requiredFile ? `require('${interpolatedValue}')` : `require(${interpolatedValue})`;
          break;

        case 'render':
        // render is default mode
        default:
          const requireType = requireTypes[type];
          expression = `${requireType}(${file},'${issuer}')`;
          break;
      }

      return expression;
    },

    /**
     * Resolve required filenames in Pug node attributes.
     *
     * @param {Object} node The Pug AST Node.
     * @param {string} attrName The node attribute name.
     */
    resolveNodeAttributes(node, attrName) {
      const attrs = node[attrName];
      if (!attrs || attrs.length === 0) return;

      for (let attr of attrs) {
        const value = attr.val;

        if (isRequired(value)) {
          if (node.name === 'script') {
            attr.val = this.requireExpression(value, attr.filename, Resolver.types.script);
          } else if (node.name === 'link') {
            if (node.attrs.find(isStyle)) {
              attr.val = this.requireExpression(value, attr.filename, Resolver.types.style);
            } else {
              attr.val = this.requireExpression(value, attr.filename, Resolver.types.asset);
            }
          } else {
            attr.val = this.resolveResource(value, attr.filename);
          }
        } else if (typeof value === 'string') {
          // TODO: fix pugjs BUG - in attributes the `&` will be escaped into `&amp;`
          //       e.g.: src="file.png?param1=1&param2=2" => src="file.png?param1=1&amp;param2=2"
          attr.val = value.replaceAll('&', '__DECODE_AMP__');
        }
      }
    },

    /**
     * Resolve resource file in a tag attribute.
     *
     * @param {string} value The resource value or code included require().
     * @param {string} issuer The filename of the template where resolves the resource.
     * @param {string|undefined} type
     * @return {string}
     */
    resolveResource(value, issuer, type = undefined) {
      const openTag = 'require(';
      const openTagLen = openTag.length;
      let pos = value.indexOf(openTag);

      if (pos < 0) return value;

      let lastPos = 0;
      let result = '';
      let char;

      // TODO: test for win
      //if (isWin) issuer = pathToPosix(issuer);

      // in value replace all `require` with handler name depend on a method
      while (~pos) {
        let startPos = pos + openTagLen;
        let endPos = startPos;
        let opened = 1;

        do {
          char = value[++endPos];
          if (char === '(') opened++;
          else if (char === ')') opened--;
        } while (opened > 0 && char != null && char !== '\n' && char !== '\r');

        // if (opened > 0) {
        //   do nothing, this issue is handled by Pug/Lexer: 'The end of the string reached with no closing bracket ) found.'
        // }

        const file = value.slice(startPos, endPos);
        const replacement = this.requireExpression(file, issuer, type);

        result += value.slice(lastPos, pos) + replacement;
        lastPos = endPos + 1;
        pos = value.indexOf(openTag, lastPos);
      }

      if (value.length - 1 > pos + openTagLen) {
        result += value.slice(lastPos);
      }

      return result;
    },

    /**
     * Resolve filenames in Pug node.
     *
     * @param {Object} node The Pug AST Node.
     */
    resolveNode(node) {
      switch (node.type) {
        case 'Code':
          if (isRequired(node.val)) {
            node.val =
              this.lastTag === 'script'
                ? this.requireExpression(node.val, node.filename, Resolver.types.script)
                : this.resolveResource(node.val, node.filename, 'expression');
          }
          break;
        case 'Mixin':
          if (isRequired(node.args)) {
            node.args = this.resolveResource(node.args, node.filename);
          }
          break;
        case 'Each':
        case 'EachOf':
          if (isRequired(node.obj)) {
            node.obj = this.resolveResource(node.obj, node.filename);
          }
          break;
        case 'Tag':
          this.lastTag = node.name;
        // fallthrough
        default:
          this.resolveNodeAttributes(node, 'attrs');
          this.resolveNodeAttributes(node, 'attributeBlocks');
          break;
      }
    },
  };
};

module.exports = { LoaderResolvers, ResolvePlugin };
