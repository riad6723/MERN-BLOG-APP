const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')
const FollowerModel=require('../models/followerModel')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const followerModel = require('../models/followerModel')
const { response } = require('express')


const handleRegister= (req, res) => {
    const {username, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({username, email, password: hash, profilePic: req.file.filename})
        .then(user => res.json(user))
        .catch(err => res.json(err))
    }).catch(err => console.log(err))
}

const handleLogin= async(req, res) => {
    const {username, password} = req.body;

    try {
    const hashedPassword= await bcrypt.hash(password,10); 
    const token=jwt.sign({username,hashedPassword},process.env.SECRET_KEY);
    UserModel.findOne({username})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    res.json({status:"Success",token:token})
                } else {
                    res.json({status:"failure",token:null});
                }
            })
        } else {
          res.json({status:"user doesn't exist",token:null})
        }
    })
    .catch(err => res.json(err))

    } 
    catch (error) {
      res.json(err);
    }

    
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

  const handleAddFollower=(req,res)=>{
    const{following,follower}=req.body;
    FollowerModel.findOne({following})
    .then(result=>{
      if(!result){
        res.status(404).json({message: "user needs to exist to be followed"});
      }
      else{
        const followersArray=result.followers;
        var ok=true;
        followersArray.forEach(user=>{
          if(user===follower){
            ok=false;
          }
        })

        if(ok===false)return res.status(200).json({ message: "already following", followerCount: followersArray.length});
        followersArray.push(follower);

        FollowerModel.findByIdAndUpdate({_id:result._id},{followers:followersArray})
        .then(rslt=>res.status(200).json({ message: "Followed successfully", followerCount: followersArray.length}))
        .catch(err=>res.json(err))
      }
    })
    .catch(err=>res.json(err))
  }

  const handleAddToFollowersTable=(req,res)=>{
    const {username}=req.body;
    FollowerModel.create({following:username,followers:[]})
    .then(result=>res.status(200).json('successfully added the user into the followers table'))
    .catch(err=>res.status(500).json(err))
  }

  const handleDeleteFollower=(req,res)=>{
    const {follower,following}=req.body;
    FollowerModel.findOne({following})
    .then(result=>{
      if(!result)return res.status(404).json({message: "user doesn't exist"});
      const newArray=result.followers.filter(name=>name!=follower);
      FollowerModel.findByIdAndUpdate({_id:result._id},{followers:newArray})
      .then(rslt=>res.status(200).json({ message: "Unfollowed successfully",followerCount: newArray.length}))
      .catch(err=>res.json(err))
    })
    .catch(err=>console.log(err))
  }

module.exports={handleRegister,handleLogin,handleWrite,handleEdit, handleAddFollower, handleAddToFollowersTable,handleDeleteFollower};