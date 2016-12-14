const _      = require('lodash'),
      origin = require('git-origin-url'),
      url    = require('url'),
      utils  = require('../../utils');

function notEmpty(src) {
  return !!src;
}

function namespaceFriendly(value) {
  return _.words(value).map(_.upperFirst).join('');
};

function humanFriendly(string) {
  return _.words(string).map(_.upperFirst).join(' ')
}

function getGitOriginURL() {
  return new Promise(function(resolve) {
    origin(function(err, url) {
      var gitURL;

      if (err) return resolve({});

      // Retrieves info from git URL
      gitURL = url.match(/^git@(.*?):(.*?)\/(.*?)(\.git)?$/);
      if (gitURL) {
        url = ['https://', gitURL[1], '/', gitURL[2], '/', gitURL[3]].join('');
      } else {
        gitURL = url.match(/^https?:\/\/(.*?)\/(.*?)\/(.*?)(\.git)?$/);
      }

      resolve({
        url: url,
        project: gitURL[2],
        name: gitURL[3],
      });
    });
  });
}

module.exports = function() {
  utils.banner();
  return getGitOriginURL()
  .then(function(repo) {
    const repoFriendlyName = repo.name ? humanFriendly(repo.name) : null;
    const repoFriendlyProject = repo.project ? humanFriendly(repo.project) : null;

    return this.prompt([
      {
        type:     'input',
        name:     'plugin_name',
        message:  'Plugin name (human friendly)',
        validate: notEmpty,
        default:  function() {
          return repoFriendlyName;
        },
      }, {
        type:     'input',
        name:     'vendor_name',
        message:  'Vendor name (human friendly)',
        validate: notEmpty,
        default:  function(config) {
          if (!repoFriendlyName) {
            return repoFriendlyProject;
          }

          if (repoFriendlyName.toLowerCase() !== config.plugin_name.toLowerCase()) {
            return repoFriendlyName;
          }

          return null;
        }
      }, {
        type:     'input',
        name:     'plugin_url',
        message:  'Plugin URL',
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
        validate:  notEmpty,
        default:  function(config) { return _.kebabCase(config.plugin_name); }
      }, {
        type:     'input',
        name:     'namespace',
        message:  'Namespace',
        default:  function(config) {
          return [
            namespaceFriendly(config.vendor_name),
            'WP',
            'Plugin',
            namespaceFriendly(config.plugin_name),
          ].join('\\');
        },
        validate: notEmpty
      }, {
        type:     'input',
        name:     'tests_namespace',
        message:  'Tests namespace',
        default:  function(config) {
          return [
            namespaceFriendly(config.vendor_name),
            'WP',
            'Plugin',
            'Tests',
            namespaceFriendly(config.plugin_name),
          ].join('\\');
        },
        validate: notEmpty
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
        validate: notEmpty
      }
    ])
    .then(function(config) {
      this.config.set(config);
      this.config.set('git_issues', `${config.project_url.replace(/\/+$/, '')}/issues`);
      this.config.set('git_source', config.project_url || '');
    }.bind(this));
  }.bind(this));
};