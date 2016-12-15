var _                 = require('lodash'),
    loadPluginConfigs = require('./loadPluginConfigs');

module.exports = function() {
  if (this.config.get('project_url')) return;

  console.log('loading info from plugin…');
  return loadPluginConfigs(this.destinationPath())
  .then(function(plugin) {
    if (!plugin.header) return plugin;

    this.config.set(_.omitBy({
      plugin_name: plugin.header.plugin_name,
      plugin_url: plugin.header.plugin_url,
      project_url: plugin.header.link,
      vendor_name: plugin.header.package,
      plugin_description: plugin.header['plugin_description'],
      version: plugin.header['version'],
      text_domain: plugin.header['text_domain'],
    }, function(value, key) {
      return this.config.get(key);
    }.bind(this)));

    return plugin;
  }.bind(this))
  .then(function(plugin) {
    if (!plugin.composer) return plugin;

    var namespace, tests_namespace;

    if (plugin.composer.autoload && plugin.composer.autoload['psr-4']) {
      namespace = _.findKey(plugin.composer.autoload['psr-4'], function(mapping) {
        return mapping === "lib/";
      });
    }

    if (plugin.composer['autoload-dev'] && plugin.composer['autoload-dev']['psr-4']) {
      tests_namespace = _.findKey(plugin.composer['autoload-dev']['psr-4'], function(mapping) {
        return mapping === "tests/";
      });
    }

    this.config.set(_.omitBy({
      composer_name: plugin.composer.name,
      text_domain: plugin.composer.name.replace(/.*\/(.*)$/, ''),
      plugin_url: plugin.composer.homepage,
      git_issues: plugin.composer.homepage.replace(/\/+$/, '') + '/issues',
      git_source: plugin.composer.homepage,
      namespace: namespace.replace(/\\$/, ''),
      tests_namespace: tests_namespace.replace(/\\$/, ''),
    }, function(value, key) {
      return this.config.get(key);
    }.bind(this)));
  }.bind(this));
}
