import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import './App.css';
import Login from './Components/Login'
// import Info from './Components/Info'

function App() {
  return (    


    <Router basename={process.env.PUBLIC_URL}>
      <AppBar position='static' color="#fafafa">
        <Toolbar>
          <svg src="../public/capital-one-logo.svg" />
        </Toolbar>
      </AppBar>
      <Login />


    </Router>

  );
}

export default App;
