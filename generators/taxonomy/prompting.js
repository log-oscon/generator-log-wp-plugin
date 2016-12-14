var _         = require('lodash'),
    pluralize = require('pluralize'),
    appPrompt = require('../app/prompting'),
    utils     = require('../../utils');

module.exports = function() {
  return this.prompt([
    {
      type:     'input',
      name:     'slug',
      message:  'Taxonomy Slug',
      validate:  function(slug) {
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
      name:     'singular_name',
      message:  'Taxonomy Singular Name',
      validate:  utils.notEmpty,
      default:  function(config) { return utils.humanFriendlyCase(config.slug); }
    }, {
      type:     'input',
      name:     'plural_name',
      message:  'Taxonomy Plural Name',
      validate:  utils.notEmpty,
      default:  function(config) { return pluralize.plural(config.singular_name); }
    }, {
      type:     'input',
      name:     'version',
      message:  'Version',
      validate:  utils.notEmpty,
      default:  function() { return this.config.get('version'); }.bind(this)
    }, {
      type:     'input',
      name:     'class',
      message:  'Taxonomy Class Name',
      validate:  function(slug) { return utils.notEmpty(slug) && !!slug.match(/[A-Z][a-zA-Z_0-9]+/); },
      default:  function(config) { return utils.namespaceFriendlyCase(config.slug); }
    }, {
      type:     'checkbox',
      name:     'args',
      message:  'Taxonomy Options (checked if true)',
      choices: [
        { name: 'hierarchical', checked: false },
        { name: 'public', checked: true },
        { name: 'show_ui', checked: true },
        { name: 'show_admin_column', checked: true },
        { name: 'show_in_nav_menus', checked: true },
        { name: 'show_tagcloud', checked: false },
        { name: 'show_in_rest', checked: true }
      ],
    }
  ])
  .then(function(config) {
    config.test_class = config['class'] + '_TestCase';
    config.test_name = config['class'];
    var taxonomies = this.config.get('taxonomies') || {};
    taxonomies[config.slug] = config;
    this.config.set('taxonomies', taxonomies);
    this.config.set('version', config.version);
    this.currentTaxonomy = config;

    if (!this.config.get('project_url')) {
      return appPrompt.bind(this)();
    }
  }.bind(this));
};
