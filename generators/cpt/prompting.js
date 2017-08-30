var _         = require('lodash'),
    pluralize = require('pluralize'),
    appPrompt = require('../app/prompting'),
    utils     = require('../../utils');

module.exports = function() {
  return this.prompt([
    {
      type:     'input',
      name:     'singular_name',
      message:  'Post Type Singular Name',
      validate:  utils.notEmpty
    }, {
      type:     'input',
      name:     'plural_name',
      message:  'Post Type Plural Name',
      validate:  utils.notEmpty,
      default:  function(config) { return pluralize.plural(config.singular_name); }
    }, {
      type:     'input',
      name:     'description',
      message:  'Post Type small description',
      validate:  utils.notEmpty,
      default:  function(config) { return pluralize.plural(config.singular_name); }
    }, {
      type:     'input',
      name:     'slug',
      message:  'Post Type Slug',
      default:  function(config) {
        return _.kebabCase(config.singular_name);
      },
      validate: function(slug) {
        if (!slug)
        return "Slug can't be empty";

        if ((this.config.get('taxonomies') || {})[slug])
        return 'A taxonomy with that slug already exists';

        if (!slug.match(/^[a-z][a-z0-9-]+$/))
        return 'Slug with invalid format.';

        return true;
      }.bind(this)
    }, {
      type:     'input',
      name:     'version',
      message:  'Version',
      validate:  utils.notEmpty,
      default:  function() { return this.config.get('version'); }.bind(this)
    }, {
      type:     'input',
      name:     'class',
      message:  'Post Type Class Name',
      validate:  function(slug) { return utils.notEmpty(slug) && !!slug.match(/[A-Z][a-zA-Z_0-9]+/); },
      default:  function(config) { return utils.namespaceFriendlyCase(config.slug); }
    }, {
      type:     'checkbox',
      name:     'args',
      message:  'Post Type Options',
      choices: [
        { name: 'hierarchical', checked: false },
        { name: 'public', checked: true },
        { name: 'show_ui', checked: true },
        { name: 'show_in_menu', checked: true },
        { name: 'show_in_admin_bar', checked: true },
        { name: 'show_in_nav_menus', checked: true },
        { name: 'can_export', checked: false },
        { name: 'has_archive', checked: true },
        { name: 'exclude_from_search', checked: false },
        { name: 'publicly_queryable', checked: true },
        { name: 'show_in_rest', checked: true }
      ],
    }
  ])
  .then(function(config) {
    config.test_class       = config['class'] + '_TestCase';
    config.test_name        = config['class'];
    var post_types          = this.config.get('post_types') || {};
    post_types[config.slug] = config;

    this.config.set('post_types', post_types);
    this.config.set('cpt_constant', _.snakeCase(config.slug).toUpperCase());
    this.config.set('version', config.version);

    this.currentCPT = config;

    if (!this.config.get('project_url')) {
      return appPrompt.bind(this)();
    }
  }.bind(this));
};
