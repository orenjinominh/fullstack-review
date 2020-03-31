const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  stars: Number,
  id: {
    type: Number,
    unique: true,
  },
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (reposData) => {

  let newRepo = new Repo(reposData);

  newRepo.save(err => {
    if (err) {
      console.log('Error saving repo into db: ', err);
    } else {
      console.log('Repo saved successfully into db.');
    }
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