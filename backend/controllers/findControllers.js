const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')
const FollowerModel =require('../models/followerModel')

const searchKey=(req,res)=>{
    const {username}= req.body;
    const usernameRegex = new RegExp(`^${username}`, 'i');
    UserModel.find({username: usernameRegex})
    .then(result=>{ res.json(result)})
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
      .then(result => {
        res.status(200).json(result);
      })
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

const getFollowerCount=(req,res)=>{
  const {author}=req.body;
  FollowerModel.findOne({following:author})
  .then(result=>{
    if(result.followers)res.status(200).json(result.followers.length);
    else res.status(200).json(0);
  })
  .catch(err=>res.json(err))
}

const checkfollower=(req,res)=>{
  const {following, follower}=req.body;
  FollowerModel.findOne({following})
  .then(result=>{
    for(let i=0;i<result.followers.length;i++){
      if(result.followers[i]===follower)return res.status(200).json({message:true});
    }
    return res.status(200).json({message:false})
  })
  .catch(err=>res.json(err))
}

  module.exports={searchKey, profilePic,getposts, getUsernameFromEmail,getPostsForAuthor, getPostById,deletepost,getFollowerCount, checkfollower};