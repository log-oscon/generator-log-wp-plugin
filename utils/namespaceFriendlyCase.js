var _ = require('lodash');

function namespaceFriendlyCase(value) {
  return _.words(value).map(_.upperFirst).join('');
}

module.exports = namespaceFriendlyCase;
