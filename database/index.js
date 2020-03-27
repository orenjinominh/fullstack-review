const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  stars: Number,
  id: {
    type: Number,
    unique: true,
  }
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // data coming in will be an array of repos, so we need to loop thru array of objects (repo) to save relevant info

  repos.forEach(repo => {
    let newRepo = new Repo({
      name: repo.name,
      owner: repo.owner.login,
      stars: repo.stargazers_count,
      id: repo.id
    });

    newRepo.save((err, data) => {
      if (err) {
        console.log('Error saving repo into db: ', err);
      } else {
        console.log('Repo saved successfully into db.');
      }
    });
  });
}


let find = (cb) => {
  Repo.find({})
    .limit(25)
    .sort({stars: -1})
    .exec((err, res) => {
      if (err) {
        console.log('Error retrieving repos from db');
      } else {
        cb(res);
      }
    })
}

module.exports.save = save;
module.exports.find = find;