const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  stars: Number,
  id: {
    type: Number,
    unique: true,
  },
  repo_url: {
    type: String,
    unique: true,
  }
});

let Repo = mongoose.model('Repo', repoSchema);

// data coming in is objects in an array!
let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // WIP...
  let newRepo = new Repo({
    owner: repo.owner,
    name: repo.name,
    stars: repo.stargazers_count,
    id: repo.id,
    url: repo.html_url,
  })

}


module.exports.save = save;