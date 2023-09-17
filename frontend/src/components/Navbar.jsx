import React , { useEffect, useState } from 'react'
import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import axios from "axios";


function Navbar() {
  
  const [user,setUser]=useState();
  const history=useHistory();
  const [searchKey, setSearchKey]=useState();
  const [profilePic,setProfilePic]=useState();

  useEffect( ()=>{
    const loggedinUsername = localStorage.getItem('loggedinUsername');
    if(loggedinUsername){
      axios.post(`http://localhost:5000/api/find/profilepic`,{username:loggedinUsername})
      .then(result => {
        setProfilePic(result.data)
      })
      .catch(err => console.log(err))
      setUser(loggedinUsername);
    }

  },[user, profilePic]);

  const handleClick = ()=>{
    localStorage.removeItem('loggedinUsername');
    setUser("");
    history.push('/');
  }

  const handleSearch=()=>{
    axios.post('http://localhost:5000/api/find/search',{username:searchKey})
    .then(result=>{
      if(result.data){
        history.push(`/profile?author=${searchKey}`);
      }
      else{
        history.push(`/notfound`);
      }
    })
    .catch(err=>console.log(err))
  }

  return (
  <div className="top">
    <div className="topLeft">
      <span>Tech Blog</span>
    </div>
    <div className="topCenter">
    <div className="navbarRoutes">
    <span><Link to="/">Home</Link></span>
      { user? <span><Link to="/write">Write</Link></span> : <></>}
      <span><Link to="/">Contact</Link></span>
    </div> 
      <span className='navbarSearch'> <input className='navbarSearchInput' type="text" placeholder=' search authors....' value={searchKey} onChange={e=>setSearchKey(e.target.value)}/> <button onClick={handleSearch}> <i className='fa fa-search navbarIcon'> </i>  </button> </span>
    </div>
    <div className="topRight">
      {
        user? (<> <span><Link to={`/profile?author=${user}`}><img className='navbarImg' src={`http://localhost:5000/Images/${profilePic}`} alt="" /></Link></span> <button onClick={handleClick}><span>Logout</span></button>  </>) : (<> <span><Link to="/register">Register</Link></span> <span><Link to="/login">Login</Link></span> </> )
      }
    </div>
  </div>
  )
}

export default Navbar
