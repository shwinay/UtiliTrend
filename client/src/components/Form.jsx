import React, { Component } from "react"

//class that displays the search form for the website
class Form extends Component {

    state = {
        username : "",
        password : "",
    }

    updateSearch = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container" style={{maxWidth : "400px"}}>
                    <center><h3 className="display-4">Sign In</h3></center>
                    <form onSubmit={event => {event.preventDefault()}}>
                        <center>
                            <input placeholder="Username" 
                                className="form-control input m-4"
                                name="username"
                                type="text" value={this.state.username}
                                onChange={this.updateSearch}
                            />
                            <input placeholder="Password" 
                                className="form-control input m-4 password"
                                name="password"
                                type="password" value={this.state.password}
                                onChange={this.updateSearch}
                            />
                            <button 
                                className="btn btn-info"
                                onClick={() => {this.props.changePage("dashboard")}}
                            >
                                SIGN IN
                            </button>
                        </center>
                    </form>
                </div>
            </React.Fragment>
        );
    }

}

export default Form;