var _  = require('lodash'),
    utils  = require('../../utils'),
    yeoman = require('yeoman-generator');

var LogGenerator = yeoman.Base.extend({
  banner: utils.banner(),

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
        this.destinationPath('Taxonomy/' + config['taxonomy_class'] + '.php'),
        config
      );

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
