import React from 'react'
import './Profile.css'
import { useLocation, Link } from 'react-router-dom';
import  { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';

function Profile() {
  
  const[posts , setPosts]= useState([]);
  const [author, setAuthor]=useState();
  const [profilePic, setProfilePic]=useState();
  const location = useLocation();
  
  useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  setAuthor(queryParams.get('author'));

  axios.post('http://localhost:5000/profilepic',{username:queryParams.get('author')})
  .then(result=>{
    setProfilePic(result.data)
  })
  .catch(err=>console.log(err))
    
    axios.post(`http://localhost:5000/getpostbyauthor`,{author:queryParams.get('author')})
    .then(result => {
      setPosts(result.data)
    })
    .catch(err => console.log(err))

  },[location])

  return (
    <div className='profile'>
        <div className="profileTop">
          <div className="profileCard">
            <img className="profilePic" src={"http://localhost:5000/Images/"+profilePic} alt='pic'/>
            <div className="profileDesc">
              <h6 className="profileName">{author}</h6>
              <h6 className="profileBlogs">{`Author of ${posts.length} blogs`}</h6>
              <h6 className="profileSomething">something else</h6>
            </div>
          </div>
        </div>

      <div className="profileBottom">

          {
            posts.map((post)=>(
              <Link to={`/post/${post._id}`}>
          
        <div className="profilePost">

          <img class="profilePostImage" src={`http://localhost:5000/Images/${post.file}`} alt='pic'/>

          <div class="profilePostContent">
            <div className='profilePostTop'>
              <p className='profilePostTitle'>{post.title}</p>
              <p className='profilePostAuthor'>{post.author}</p>
              <p className='profileTime'>{moment(post.createdAt).fromNow()}</p>
            </div>

            <p className='profilePostDesc'>{post.description}</p>
          </div>

        </div></Link>
))
          }
      </div>

    </div>
  )
}

export default Profile