var origin = require('git-origin-url');

function getGitOriginURL() {
  return new Promise(function(resolve) {
    origin(function(err, url) {
      var urlParsed;

      if (err) return resolve({});

      // Retrieves info from git URL
      urlParsed = url.match(/^git@(.*?):(.*?)\/(.*?)(\.git)?$/);
      if (urlParsed) {
        url = ['https://', urlParsed[1], '/', urlParsed[2], '/', urlParsed[3]].join('');
      } else {
        urlParsed = url.match(/(\/(.*?))?\/(.*?)(\.git)?$/);
      }

      if (!urlParsed)  {
        return resolve({});
      }

      resolve({
        url: url,
        project: urlParsed[2],
        name: urlParsed[3],
      });
    });
  });
}

module.exports = getGitOriginURL;
