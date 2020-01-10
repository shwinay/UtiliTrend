import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import './App.css';
import Login from './Components/Login'
import Info from "./Components/Info"

class App extends Component {

  state={
    page: "login",
    user: ""
  }
  render() {
    return (    
      <Router>
        <AppBar position='static' color="#FAFAFA">
          <Toolbar>
            <svg src="../public/capital-one-logo.svg" />
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={Login} /> 
        <Route exact path="/Info" component={Info} />
      </Router>
    );
  }
}

export default App;
