"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.join");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

var fs = require('fs');

var path = require('path');

var MagicString = require('magic-string');

var _require = require('rollup-pluginutils'),
    createFilter = _require.createFilter;

module.exports = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var include = opts.include || '**/*.less';
  var exclude = opts.exclude;
  var filter = createFilter(include, exclude);
  var filtering = opts.filtering !== false;
  var paths = opts.paths || ['./node_modules'];
  var sourcemap = opts.sourcemap !== false;
  return {
    name: 'rollup-plugin-lessimporter',
    transform: function transform(code, id) {
      if (filtering && !filter(id)) return null;
      var magicString = new MagicString(code);
      var importRegex = /(@import[^'"]*['"]+)(~[^'"]+)(['"]+\s*;)/g;
      var hasExtensionRegex = /\.\w+$/;
      var match = importRegex.exec(code);

      while (match) {
        var matchString = match[0];
        var pathTried = [];
        var lessImport = match[2];
        var i = void 0;

        for (i = 0; i < paths.length; i += 1) {
          var absolutePath = path.resolve(path.join(paths[i], lessImport.replace(/^~/, '')));

          if (!hasExtensionRegex.test(absolutePath)) {
            absolutePath = "".concat(absolutePath, ".less");
          }

          if (fs.existsSync(absolutePath)) {
            lessImport = absolutePath;
            break;
          }

          pathTried.push(absolutePath);
        }

        if (lessImport === match[2]) {
          throw new Error("cannot resolve import '".concat(lessImport, "', tried:\n  ").concat(pathTried.join('\n  ')));
        }

        magicString.overwrite(match.index, match.index + matchString.length, "".concat(match[1]).concat(lessImport).concat(match[3]));
        match = importRegex.exec(code);
      }

      return {
        code: magicString.toString(),
        map: sourcemap ? magicString.generateMap({
          hires: true
        }) : null
      };
    }
  };
};