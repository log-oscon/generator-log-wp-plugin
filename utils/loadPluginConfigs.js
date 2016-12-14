var _      = require('lodash'),
    findup = require('findup'),
    fs     = require('fs'),
    path   = require('path');

function loadPluginConfigs(originPath) {
  return new Promise(function(resolve) {
    findup(originPath, 'composer.json',  function(err, rootPath) {
      if (err) return resolve(false);

      resolve(rootPath);
    });
  }).then(function(rootPath) {
    if (!rootPath) return {};

    var composer   = require(path.resolve(rootPath, 'composer.json')),
        pluginFile,
        matches,
        pluginHeader,
        parsedHeader = {},
        regexParam = /\n\s*\*\s*([^:\n@]*):\s*(.*)/g,
        regexTags = /\n\s*\*\s@([a-zA-Z-]+)[ \t]+([^\n]+)/g,
        pluginRoot = path.resolve(rootPath, path.basename(rootPath) + '.php');

    if (!fs.existsSync(pluginRoot)) resolve({ composer: composer })

    pluginFile = fs.readFileSync(pluginRoot).toString();
    pluginHeader = pluginFile.match(/\/\*\*(\n|.)*?\*\//);
    if (!pluginHeader) return { composer: composer };

    while (matches = regexParam.exec(pluginHeader[0])) {
      parsedHeader[_.snakeCase(matches[1])] = matches[2].trim();
    }

    while (matches = regexTags.exec(pluginHeader[0])) {
      parsedHeader[_.snakeCase(matches[1])] = matches[2].trim();
    }

    return {
      composer: composer,
      header: parsedHeader,
    };
  });
}

module.exports = loadPluginConfigs;
