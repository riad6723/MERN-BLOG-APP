
import React, { useEffect, useState } from "react";
import './Post.css'
import {Link, useParams, useHistory } from 'react-router-dom'
import axios from "axios";
import moment from 'moment'

function Post() {

  const { id } = useParams();
  const[post , setPost]= useState({});
  const [username,setUsername]=useState();
  const history=useHistory();

  useEffect(() => {
    axios.get('http://localhost:5000/api/find/getpostbyid/'+id)
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

    axios.delete('http://localhost:5000/api/find/deletepost/'+id)
    .then(result=>window.location.href='/')
    .catch(err=>console.log(err))
  }

  return (
    <>
    <div className="post">
      <div className="postLeft">
      <img src={`http://localhost:5000/Images/${post.file}`} alt="pic" className="postImage"/>
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
    <div className="postControl">
      {username===post.author? <> <i style={{color:"lightblue"}} className="fa-solid fa-pen postControlIcon" onClick={e=>{history.push(`/update/${id}`)}}> </i> <i className="fa-solid fa-trash postControlIcon" onClick={handleClick}></i> </> : 
      <></>
      }
    </div>
    </>
  );
}

export default Post;