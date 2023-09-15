
import React, { useEffect, useState } from "react";
import './Post.css'
import {Link, useParams } from 'react-router-dom'
import axios from "axios";
import moment from 'moment'

function Post() {

  const { id } = useParams();
  const[post , setPost]= useState({});
  const [username,setUsername]=useState();

  useEffect(() => {
    axios.get('http://localhost:5000/getpostbyid/'+id)
    .then(rslt => {
      setPost(rslt.data)
    })
    .catch(err => console.log(err))

    const loggedinUsername = localStorage.getItem('loggedinUsername');
    if(loggedinUsername){
      setUsername(loggedinUsername);
    }
  }, [id])

  const handleClick= e =>{

    axios.delete('http://localhost:5000/deletepost/'+id)
    .then(result=>window.location.href='/')
    .catch(err=>console.log(err))
  }

  return (
    <div className="post">
      <div className="postLeft">
      <img src={`http://localhost:5000/Images/${post.file}`} alt="pic" className="postImage"/>
      <div className="postLinks">
        {username===post.author? ( <> <span><Link to={`/update/${id}`} >Update</Link></span>
       <span><button onClick={handleClick}>Delete</button></span> </> ) : <></>}
       
      </div>
      </div>
     <div className="postContent">
         <div className='postTop'>
            <p className='postTitle'>{post.title}</p>
            <p className='postAuthor'> <Link to={`/profile?author=${post.author}`}>{post.author}</Link></p>
            <p className='postTime'>{moment(post.createdAt).fromNow()}</p>
            
          </div>

          <p className='postDesc'>{post.description}</p>
     </div>

    </div>
  );
}

export default Post;