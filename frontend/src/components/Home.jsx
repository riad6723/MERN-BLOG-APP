import React,  { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import moment from 'moment'

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/find/getposts')
    .then(posts => {
      setPosts(posts.data)
    })
    .catch(err => console.log(err))
  }, [])


  return (
    <div className='home'>

      {
        
        posts.map( (post, key) => (
        
      <div class="homeCard" key={key}>
        <Link to={`/post/${post._id}`} className='home'>
            <img class="homeCardImage" src={`http://localhost:5000/Images/${post.file}`} alt='pic'/>

        <div class="homeCardContent">
          <div className='homeCardTop'>
            <p className='homeCardTitle'>{post.title}</p>
            <p className='homeCardAuthor'>{post.author}</p>
            <p className='homeCardTime'>{moment(post.createdAt).fromNow()}</p>
          </div>
          <p className='homeCardDesc'>{post.description}</p>
        </div>
        </Link>
      </div>
        ))
      }

    </div>
  )
}

export default Home