var origin = require('git-origin-url');

function getGitOriginURL() {
  return new Promise(function(resolve) {
    origin(function(err, url) {
      var gitURL;

      if (err) return resolve({});

      // Retrieves info from git URL
      gitURL = url.match(/^git@(.*?):(.*?)\/(.*?)(\.git)?$/);
      if (gitURL) {
        url = ['https://', gitURL[1], '/', gitURL[2], '/', gitURL[3]].join('');
      } else {
        gitURL = url.match(/^https?:\/\/(.*?)\/(.*?)\/(.*?)(\.git)?$/);
      }

      resolve({
        url: url,
        project: gitURL[2],
        name: gitURL[3],
      });
    });
  });
}

module.exports = getGitOriginURL;