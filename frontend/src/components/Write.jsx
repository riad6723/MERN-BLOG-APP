
import React from "react";
import './Write.css'
import axios from "axios";
import { useState } from "react";

function Write() {

  const username=localStorage.getItem('loggedinUsername');
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [file, setFile] = useState()

  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('username', username)
      formData.append('file', file)

      axios.post('http://localhost:5000/write', formData)
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
        <h1>Create Post</h1>
      </div>

      <div className="writeBottom">

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder=" Write your post title...." className="writeTitle" onChange={e => setTitle(e.target.value)}/>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            placeholder=" Write your post...." className="writeArea" onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input type="file" className="writeFile" placeholder="Select an image for your post"  onChange={e => setFile(e.target.files[0])}/>
          <button className="writePost">Post</button>
        </form>

      </div>

    </div>
  );
}

export default Write;