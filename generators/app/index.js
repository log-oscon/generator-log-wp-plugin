var yeoman = require('yeoman-generator');

var LogGenerator = yeoman.Base.extend({
  /**
   * Prompts all required data and feeds the generator config
   */
  prompting: require('./prompting'),

  writing: {
    copyFromTemplate: function() {
      this.fs.copyTpl(
        this.templatePath('**'),
        this.destinationPath(),
        this.config.getAll()
      );
    }
  },

  end: function() {
    console.log('Here I AM!');
  }
});

module.exports = LogGenerator;