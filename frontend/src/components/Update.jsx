import {useParams } from 'react-router-dom'
import './Write.css'
import axios from "axios";
import React, { useEffect, useState } from "react";

function Update() {

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const { id } = useParams();
  const [user,setUser]=useState();
  const [file, setFile] = useState()

  useEffect(() => {
    
    axios.get('http://localhost:5000/getpostbyid/'+id)
    .then(rslt => {
      setTitle(rslt.data.title);
      setDescription(rslt.data.description);
    })
    .catch(err => console.log(err))

    const loggedinUsername = localStorage.getItem('loggedinUsername');
    if(loggedinUsername)setUser(loggedinUsername);
  }, [id, user])

  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('username', user)
      formData.append('file', file)
      console.log(user);

      axios.put('http://localhost:5000/editpost/'+id, formData)
      .then(res => {
          if(res.data === "Success") {
              window.location.href = "/"
          }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="write">
      <div className="writeTop">
        <h1>Edit Post</h1>
      </div>

      <div className="writeBottom">

        <form onSubmit={handleSubmit}>
          <input type="text" className="writeTitle" value={title} onChange={e => setTitle(e.target.value)}/>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            value={description}
            placeholder=" Write your post...." className="writeArea" onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input type="file" className="writeFile" placeholder="Select an image for your post"  onChange={e => setFile(e.target.files[0])}/>
          <button className="writePost">Update</button>
        </form>

      </div>

    </div>
  );
}

export default Update;