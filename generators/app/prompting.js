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
      if (err) {
        return resolve({});
      }

      const sshGit = url.match(/^git@(.*?):(.*?)\/(.*?)(\.git)?$/);
      if (sshGit) {
        const [,, project, name ] = sshGit;
        resolve({
          url: ['https://', sshGit[1], '/', sshGit[2], '/', sshGit[3]].join(''),
          project,
          name,
        });
      } else {
        const httpGit = url.match(/^https?:\/\/(.*?)\/(.*?)\/(.*?)(\.git)?$/);
        const [,, project, name ] = httpGit;
        resolve({
          url,
          project,
          name,
        });
      }
    });
  });
}

module.exports = function() {
  utils.banner();
  return getGitOriginURL()
  .then(repo => {
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
        name:     'plugin_description',
        message:  'Plugin Description'
      }, {
        type:     'input',
        name:     'text_domain',
        message:  'Text Domain',
        validate:  notEmpty,
        default:  ({ plugin_name }) => _.kebabCase(plugin_name)
      }, {
        type:     'input',
        name:     'namespace',
        message:  'Namespace (PHP)',
        default:  function(config) {
          return [
            namespaceFriendly(config.vendor_name),
            'WP',
            'Plugin',
            namespaceFriendly(config.plugin_name)
          ].join('\\');
        },
        validate: notEmpty
      }, {
        type:     'input',
        name:     'composer_name',
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
    .then(config => {
      this.config.set(config);
      return this.config.save();
    });
  });
};