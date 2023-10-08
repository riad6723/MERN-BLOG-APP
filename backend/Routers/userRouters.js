const {checkToken,checkUser} = require('../middlewares/authentication')
const express=require('express')
const router = express.Router();
const {handleRegister, handleLogin,handleWrite,handleEdit, handleAddFollower, handleAddToFollowersTable, handleDeleteFollower }=require('../controllers/userControllers')
const multer = require("multer");
const path = require("path");
  //creating storage for images

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({
    storage: storage
  })

  router.post('/register',  upload.single('file'),handleRegister); // user registration
  router.post('/login', handleLogin); //user Login
  router.post('/write', checkToken, checkUser,upload.single('file'),handleWrite); // creating a post
  router.put('/editpost/:id',  checkToken, checkUser, upload.single('file'),handleEdit);//editing single post by id
  router.post('/addfollower',checkToken,checkUser,handleAddFollower); // add one follower
  router.post('/addtofollowerstable',handleAddToFollowersTable); //adding one user to the follower table
  router.post('/deletefollower',checkToken,checkUser,handleDeleteFollower);
  

module.exports={userRouters : router};

