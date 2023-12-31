const express=require('express')
const router = express.Router();
const {searchKey, profilePic, getposts, getUsernameFromEmail, getPostsForAuthor, getPostById,deletepost,getFollowerCount,checkfollower}=require('../controllers/findControllers')

router.post('/search',searchKey);// matching searchkey
router.post('/profilepic',profilePic);// find profilePic by username
router.get('/getposts', getposts); //finding all posts from database for homepage
router.post('/username',getUsernameFromEmail);// find username for corresponding email
router.post('/getpostbyauthor',getPostsForAuthor);//finding posts by username
router.get('/getpostbyid/:id',getPostById);// finding single post by id
router.delete('/deletepost/:id',deletepost);//deleting post by id
router.post('/followercount',getFollowerCount); // getting follower count for a user
router.post('/checkfollower',checkfollower);

  

  module.exports={findRouters : router};