const test      = './test';
const languages = './languages';

export default {
  i18n: {
    src: [
      '**/*.php',
      '!languages/',
      '!gulp/',
      '!src/',
      '!test/',
      '!public/',
      '!vendor/',
      '!node_modules',
    ],
    dest: languages,
    author: 'log <engenharia@log.pt>',
    support: 'http://log.pt',
    pluginSlug: '<%= text_domain %>',
    textDomain: '<%= text_domain %>',
    potFilename: '<%= text_domain %>'
  },
  phpunit: {
    watch: '/**/*.php',
    src: test + '/phpunit/**/*.test.php'
  }
};
