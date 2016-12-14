var _ = require('lodash');

function humanFriendlyCase(string) {
  return _.words(string).map(_.upperFirst).join(' ')
}

module.exports = humanFriendlyCase;
