const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')
const bcrypt = require('bcrypt')


const handleRegister= (req, res) => {
    const {username, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({username, email, password: hash, profilePic: req.file.filename})
        .then(user => res.json(user))
        .catch(err => res.json(err))
    }).catch(err => console.log(err))
}

const handleLogin= (req, res) => {
    const {username, password} = req.body;
    UserModel.findOne({username})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    res.json("Success")
                } else {console.log("incorrect");
                    res.json("Password is incorrect");
                }
            })
        } else {
          res.json("User does not exist")
        }
    })
    .catch(err => res.json(err))
  }

  const handleWrite= (req, res) => {
    if(req.file){
      PostModel.create({title: req.body.title, 
        description: req.body.description, 
        file: req.file.filename, author: req.body.username})
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
    }
    else{
      PostModel.create({title: req.body.title, 
        description: req.body.description, 
        author: req.body.username})
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
    }
  }

  const handleEdit=(req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndUpdate(
        {_id: id},{title: req.body.title, 
          description: req.body.description, 
          file: req.file.filename, author: req.body.username}
        ).then(result => res.json("Success"))
        .catch(err => res.json(err))
  }

module.exports={handleRegister,handleLogin,handleWrite,handleEdit};