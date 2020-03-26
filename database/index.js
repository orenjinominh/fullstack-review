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

  // repos come to us as objects in an array
  // we need to grab each value from each object on array in order to save values to db using schema

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


module.exports.save = save;