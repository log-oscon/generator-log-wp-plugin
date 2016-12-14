var yeoman = require('yeoman-generator');

var LogGenerator = yeoman.Base.extend({
  /**
   * Prompts all required data and feeds the generator config
   */
  prompting: require('./prompting'),

  writing: {
    copyFromTemplate: function() {
      this.fs.copyTpl(
        this.templatePath('base/**'),
        this.destinationPath(this.config.get('text_domain')),
        this.config.getAll()
      );

      this.fs.copyTpl(
        this.templatePath('plugin_name.php'),
        this.destinationPath(this.config.get('text_domain') + '/' + this.config.get('text_domain') + '.php'),
        this.config.getAll()
      );
    }
  },

  install: function () {
    this.spawnCommandSync('composer', ['install'], { cwd: this.destinationPath(this.config.get('text_domain')) });
  },

  end: function() {
    this.config.save();
    console.log('\n\n')
    console.log('Files have been generated under ' + this.config.get('text_domain'));
  }
});

module.exports = LogGenerator;