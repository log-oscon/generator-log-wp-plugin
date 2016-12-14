var _  = require('lodash'),
    utils  = require('../../utils'),
    yeoman = require('yeoman-generator');

var LogGenerator = yeoman.Base.extend({
  banner: utils.banner(),

  initializing: function() {
    if (this.config.get('project_url')) return;

    console.log('loading info from plugin…');
    return utils.loadPluginConfigs(this.destinationPath())
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
    }.bind(this))
    .then(() => { console.log(this.config.getAll()) });
  },

  /**
   * Prompts all required data and feeds the generator config
   */
  prompting: require('./prompting'),

  /**
   * Copies all templates inside `base/` to the new folder and then adds plugin_name.php with its
   * actual name.
   */
  writing: {
    copyFromTemplate: function() {
      var config = _.assign(
        _.mapKeys(this.currentTaxonomy, function(value, key) { return 'taxonomy_' + key; }),
        this.config.getAll()
      );

      this.fs.copyTpl(
        this.templatePath('taxonomy_class.php'),
        this.destinationPath('lib/Taxonomy/' + config['taxonomy_class'] + '.php'),
        config
      );

      if (!this.fs.exists(this.templatePath('Taxonomy.php'))) {
        this.fs.copyTpl(
          this.templatePath('Taxonomy.php'),
          this.destinationPath('lib/Taxonomy.php'),
          config
        );
      }

      this.fs.copyTpl(
        this.templatePath('taxonomy_test_name.test.php'),
        this.destinationPath('test/phpunit/' + config['taxonomy_test_name'] + '.test.php'),
        config
      );
    }
  },

  _getDiff() {
    console.log('I\'ve been here');
  },

  /**
   * Saves configs
   */
  end: function() {
    this.config.save();
    console.log('\n\n')
    console.log('Taxonomy `'+ this.currentTaxonomy.slug +'` have been added ' + this.config.get('text_domain'));
  }
});

module.exports = LogGenerator;
