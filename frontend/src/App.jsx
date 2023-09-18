import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home'
import Write from './components/Write'
import Profile from './components/Profile'
import Register from './components/Register';
import Login from './components/Login';
import Post from './components/Post'
import Update from './components/Update'
import Invalid from './components/Invalid';
import { useState, useEffect } from 'react';

function App() {

  const [username,setUsername]=useState();

  useEffect(()=>{
    setUsername(localStorage.getItem('loggedinUsername'));
    console.log(username);
  },[username])

  return (
    <div>
      <Router >
      <Navbar />
      <Switch>
      <Route exact path="/"> <Home /></Route>
      <Route path="/profile"> <Profile /></Route>
      <Route path="/write"> { username? <Write /> : <Invalid />} </Route>   
      <Route path="/register">  <Register /></Route>   
      <Route path="/login"> <Login /></Route> 
      <Route path="/post/:id"> <Post /></Route>  
      <Route path="/update/:id"> { username? <Update /> : <Invalid />}</Route>  
      <Route path="/*"> <Invalid /></Route>  
      </Switch>
      </Router>
    </div>
  )
}

export default App;
