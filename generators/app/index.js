var utils  = require('../../utils'),
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
      this.fs.copyTpl(
        this.templatePath('base/**'),
        this.destinationPath(),
        this.config.getAll()
      );

      this.fs.copyTpl(
        this.templatePath('plugin_name.php'),
        this.destinationPath(this.config.get('text_domain') + '.php'),
        this.config.getAll()
      );

      this.fs.copy(
        this.templatePath('plugin_name.pot'),
        this.destinationPath('languages/' + this.config.get('text_domain') + '.pot'),
        this.config.getAll()
      );
    }
  },

  /**
   * Runs composer install
   */
  install: function () {
    this.spawnCommandSync('composer', ['install']);
  },

  /**
   * Saves configs
   */
  end: function() {
    this.config.save();
    console.log('\n\n')
    console.log('Files have been generated under ' + this.config.get('text_domain'));
  }
});

module.exports = LogGenerator;
