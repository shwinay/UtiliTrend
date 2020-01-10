import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import './App.css';
import Login from './Components/Login'
// import Info from './Components/Info'
//1280x461
//160x58

function App() {
  return (    


    <Router basename={process.env.PUBLIC_URL}>
      <AppBar position='static' color="#fafafa">
        <Toolbar>
          <img src={"./c1Logo.png"} width='160' height='58' alt="Capital One" />
          
        </Toolbar>
      </AppBar>
      <Login />


    </Router>

  );
}

export default App;
