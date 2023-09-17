const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')


const searchKey=(req,res)=>{
    const {username}= req.body;
    PostModel.findOne({author: username})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
  }

const profilePic=(req,res)=>{
    const {username}=req.body;
    UserModel.findOne({username})
    .then(user=>res.json(user.profilePic))
    .catch(err=>res.json(err))
}

const getposts=(req, res) => {
    PostModel.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
}

const getUsernameFromEmail=(req,res)=>{
    const {email}=req.body;
    UserModel.findOne({email})
    .then(user=>{
      if(user){
        res.json(user.username);
      }
      else{
       res.json("no user found");
      }
    })
    .catch(err=> res.json(err))
}

const getPostsForAuthor= (req, res) => {
    const { author } = req.body;
    PostModel.find({ author: author })
      .then(result => res.json(result))
      .catch(err => res.json(err))
}

const getPostById= (req, res) => {
    const id = req.params.id;
    PostModel.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
}

const deletepost=(req, res) => {
    PostModel.findByIdAndDelete({_id: req.params.id})
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
  }

  module.exports={searchKey, profilePic,getposts, getUsernameFromEmail,getPostsForAuthor, getPostById,deletepost};