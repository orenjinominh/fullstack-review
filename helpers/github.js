const request = require('request');
const config = require('../config.js');
const axios = require('axios');

let getReposByUsername = async (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    },

  };

  try {
    const res = await axios.get(options.url, options.headers);

    var reposData;
    for (var i = 0; i < res.data.length; i++) {

      reposData = {
        name: res.data[i].name,
        owner: res.data[i].owner.login,
        stars: res.data[i].stargazers_count,
        id: res.data[i].id,
        url: res.data[i].html_url
      };

      cb(reposData);
    };
  } catch (err) {
    console.log('error getting repos from GIT API');
  }

}

module.exports.getReposByUsername = getReposByUsername;