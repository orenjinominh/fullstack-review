const express = require('express');
const bodyParser = require('body-parser');

const gitHelper = require('../helpers/github.js');
const database = require('../database/index.js');

const getReposByUsername = gitHelper.getReposByUsername;
const saveToDB = database.save;


let app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  getReposByUsername(req.body.username, saveToDB);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

