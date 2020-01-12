import React, { Component } from 'react'
import Jumbotron from "./components/Jumbotron"
import Form from "./components/Form";
import Dashboard from "./components/Dashboard"

//entry point for project - displays the current page
class App extends Component {
  
  state= {
    page: "search",
    username: ""
  };

  render() {
    return (
      <React.Fragment>
        {this.getPage()}
      </React.Fragment>
    )
  }

  changePage = (page, username) => { //page is either search, favorites, or about
    this.setState({page: page, username: username});
  }

  //gets the current page contents based on last clicked navbar item
  getPage() {
    if (this.state.page == "search") {
      return (
        <React.Fragment>
          <Jumbotron />
          <Form changePage={this.changePage}/>
        </React.Fragment>
      )
    }
    else if (this.state.page == "dashboard") {
      return (
        <React.Fragment>
          <Jumbotron />
          <Dashboard username={this.state.username}/>
        </React.Fragment>
      )
    }
  }

}

export default App;
