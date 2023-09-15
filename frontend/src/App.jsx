import React from 'react'
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

function App() {

  return (
    <div>
      <Router >
      <Navbar />
      <Switch>
      <Route exact path="/"> <Home /></Route>
      <Route path="/profile"> <Profile /></Route>
      <Route path="/write"> <Write /> </Route>   
      <Route path="/register"> <Register /></Route>   
      <Route path="/login"> <Login /></Route> 
      <Route path="/post/:id"> <Post /></Route>  
      <Route path="/update/:id"> <Update /></Route>  
      <Route path="/*"> <Invalid /></Route>  
      </Switch>
      </Router>
    </div>
  )
}

export default App;
