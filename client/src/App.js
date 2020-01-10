import React, { Component } from 'react'
import Jumbotron from "./components/Jumbotron"
import Form from "./components/Form";
import Dashboard from "./components/Dashboard"

//entry point for project - displays the current page
class App extends Component {
  
  state= {
    page: "search"
  };

  render() {
    return (
      <React.Fragment>
        {this.getPage()}
      </React.Fragment>
    )
  }

  changePage = (page) => { //page is either search, favorites, or about
    this.setState({page: page});
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
          <Dashboard />
        </React.Fragment>
      )
    }
    // else if (this.state.page == "favorites") {
    //   return (
    //     <React.Fragment>
    //       <Jumbotron title="My Favorites" subtitle='What are "your favorite trivia questions and answers?"'/>
    //       <Favorites />
    //     </React.Fragment>
    //   )
    // }
    // else if (this.state.page == "about") {
    //   return (
    //     <React.Fragment>
    //       <Jumbotron title="About" subtitle="Information about Jeopardy Lookup!"/>
    //       <About />
    //     </React.Fragment>
    //   )
    // }
  }

}

export default App;
