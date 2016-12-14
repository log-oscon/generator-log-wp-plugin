var _      = require('lodash'),
    url    = require('url'),
    utils  = require('../../utils');

module.exports = function() {
  return utils.getGitOriginURL()
  .then(function(repo) {
    const repoFriendlyName = repo.name ? utils.humanFriendlyCase(repo.name) : null;
    const repoFriendlyProject = repo.project ? utils.humanFriendlyCase(repo.project) : null;

    const prompts = _.filter([
      {
        type:     'input',
        name:     'plugin_name',
        message:  'Plugin name (human friendly)',
        validate: utils.notEmpty,
        default:  function() {
          return repoFriendlyName;
        },
      }, {
        type:     'input',
        name:     'vendor_name',
        message:  'Vendor name (human friendly)',
        validate: utils.notEmpty,
        default:  function(config) {
          if (!repoFriendlyName) {
            return repoFriendlyProject;
          }

          var plugin_name = config.plugin_name || this.config.get('plugin_name') || '';
          if (repoFriendlyName && repoFriendlyName.toLowerCase() !== plugin_name.toLowerCase()) {
            return repoFriendlyName;
          }

          return null;
        }.bind(this)
      }, {
        type:     'input',
        name:     'plugin_url',
        message:  'git URL',
        default:  repo && repo.url || null
      }, {
        type:     'input',
        name:     'project_url',
        message:  'Project URL',
        default:  function(config) { return config.plugin_url || (repo && repo.url || null); }
      }, {
        type:     'input',
        name:     'plugin_description',
        message:  'Plugin Description'
      }, {
        type:     'input',
        name:     'text_domain',
        message:  'Text Domain',
        validate:  utils.notEmpty,
        default:  function(config) { return _.kebabCase(config.plugin_name); }
      }, {
        type:     'input',
        name:     'namespace',
        message:  'Namespace',
        default:  function(config) {
          return [
            utils.namespaceFriendlyCase(config.vendor_name),
            'WP',
            'Plugin',
            utils.namespaceFriendlyCase(config.plugin_name),
          ].join('\\');
        },
        validate: utils.notEmpty
      }, {
        type:     'input',
        name:     'tests_namespace',
        message:  'Tests namespace',
        default:  function(config) {
          return [
            utils.namespaceFriendlyCase(config.vendor_name),
            'WP',
            'Plugin',
            'Tests',
            utils.namespaceFriendlyCase(config.plugin_name),
          ].join('\\');
        },
        validate: utils.notEmpty
      }, {
        type:     'input',
        name:     'name_composer',
        message:  'Composer package name',
        default:  function(config) {
          return [
            _.kebabCase(config.vendor_name),
            _.kebabCase(config.plugin_name)
          ].join('/');
        },
        validate: utils.notEmpty
      }, {
        type:     'input',
        name:     'version',
        message:  'Version',
        default:  '1.0.0',
        validate: utils.notEmpty
      }
    ], promps => !this.config.get(promps.name));

    return (prompts.length && this.prompt(prompts) || Promise.resolve(this.config.getAll()))
    .then(function(config) {
      this.destinationRoot(config.text_domain);
      this.config.set(config);
      this.config.set('git_issues', `${config.plugin_url.replace(/\/+$/, '')}/issues`);
      this.config.set('git_source', config.plugin_url || '');
    }.bind(this));
  }.bind(this));
};
