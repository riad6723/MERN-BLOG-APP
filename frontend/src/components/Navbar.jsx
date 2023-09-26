import React , { useEffect, useState } from 'react'
import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import axios from "axios";


function Navbar() {
  
  const [user,setUser]=useState();
  const history=useHistory();
  const [searchKey, setSearchKey]=useState();
  const [searchKeyResults, setSearchKeyResults]=useState([]);
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
    localStorage.removeItem('token');
    setUser("");
    history.push('/');
  }

  const handleSearch=(e)=>{
    if(e.target.value===""){
      setSearchKeyResults([]);
      return;
    }
    axios.post('http://localhost:5000/api/find/search',{username:e.target.value})
    .then(result=>{
      if(result.data){
        setSearchKeyResults(result.data);
      }
      else{
        history.push(`/notfound`);
      }
    })
    .catch(err=>console.log(err))
  }

  const handleSearchResultClick= (names)=>{
    setSearchKeyResults([]);
    setSearchKey('');
    history.push(`/profile?author=${names.username}`);
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
      <span className='navbarSearch'> <input className='navbarSearchInput' type="text" placeholder=' search authors....' value={searchKey} onChange={e=>{setSearchKey(e.target.value);handleSearch(e)}}/> <button onClick={handleSearch}> <i className='fa fa-search navbarIcon'> </i>  </button> </span>
      
      <div className='navbarSearchResultsBox'>
        {
          searchKeyResults.map((names,key)=>{
          return  <div key={key} className='navbarSearchResults' onClick={() => handleSearchResultClick(names)}>{names.username}</div>
          })
        }</div>
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
