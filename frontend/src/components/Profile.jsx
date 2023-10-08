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
  const [followerCount,setFollowerCount]=useState(0);
  const [showFollow, setShowFollow]=useState(true);
  const location = useLocation();
  
  useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  setAuthor(queryParams.get('author'));

  axios.post('http://localhost:5000/api/find/profilepic',{username:queryParams.get('author')})
  .then(result=>{
    setProfilePic(result.data)
  })
  .catch(err=>console.log(err))
    
    axios.post(`http://localhost:5000/api/find/getpostbyauthor`,{author:queryParams.get('author')},{headers:{
      token:localStorage.getItem('token')
    }})
    .then(result => {
      setPosts(result.data);
    })
    .catch(err => console.log(err))

    axios.post('http://localhost:5000/api/find/followercount',{author:queryParams.get('author')})
    .then(response=>setFollowerCount(response.data))
    .catch(err=>console.log(err))

    author && axios.post('http://localhost:5000/api/find/checkfollower',{follower:localStorage.getItem('loggedinUsername'),following:author})
    .then(response=> setShowFollow(!response.data.message))
    .catch(err=>console.log(err))

  },[location])

  const handleFollow = ()=>{
    const follower=localStorage.getItem('loggedinUsername');
    if(author && follower===author)return;
    
    author && axios.post('http://localhost:5000/api/user/addfollower',{follower,following:author},{headers:{
      token:localStorage.getItem('token')
    }})
    .then(response=>{
      setFollowerCount(response.data.followerCount);
      axios.post('http://localhost:5000/api/find/checkfollower',{follower:localStorage.getItem('loggedinUsername'),following:author})
      .then(resp=> setShowFollow(!resp.data.message))
      .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
  }

  const handleUnfollow=()=>{
    const follower=localStorage.getItem('loggedinUsername');
    if(author && follower===author)return;

    author && axios.post('http://localhost:5000/api/user/deletefollower',{follower,following:author},{headers:{
      token:localStorage.getItem('token')
    }})
    .then(response=>{
      setFollowerCount(response.data.followerCount);
      axios.post('http://localhost:5000/api/find/checkfollower',{follower:localStorage.getItem('loggedinUsername'),following:author})
      .then(resp=> setShowFollow(!resp.data.message))
      .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='profile'>
        <div className="profileTop">
          <div className="profileCard">
           <div className="profile--image--div">
           <img className="profilePic" src={"http://localhost:5000/Images/"+profilePic} alt='pic'/>
           </div>
            <div className="profileDesc">
              <div className="profileName">{author}</div>
              <div className="profileBlogs">{`Blogs : ${posts.length}`}</div>
              <div className="profilePopularity">Popularity : 12k</div>
              <div className="profileFollowers">Followers : {followerCount}</div>
            </div>
            {
              author && author===localStorage.getItem('loggedinUsername')? null : 
              <div className="profile--card--button">
              {
                showFollow && showFollow? <button onClick={handleFollow}>Follow</button> : <button onClick={handleUnfollow}>Unfollow</button>
              }
              </div>
            }
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