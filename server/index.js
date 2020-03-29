const express = require('express');
const bodyParser = require('body-parser');

const gitHelper = require('../helpers/github.js');
const database = require('../database/index.js');

const getReposByUsername = gitHelper.getReposByUsername;
const saveToDB = database.save;
const fetchFromDB = database.find;


let app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

app.post('/repos', async function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  try {
    let username = req.body.username;
    let saved = await getReposByUsername(username, saveToDB);
    res.status(201);
    res.end();
  } catch(err) {
    console.log(err);
  }



});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  try {
    fetchFromDB((results) => {
      res.status(200);
      res.send(results);
    });
  } catch (err) {
    console.log('Error getting repos from db: ', err);
  }


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

