import React, { Component } from "react"

//class that displays the search form for the website
class Form extends Component {

    state = {
        username : "",
        password : "",
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
                                type="text" value={this.state.username}
                            />
                            <input placeholder="Password" 
                                className="form-control input m-4"
                                type="text" value={this.state.password}
                            />
                            <button 
                                className="btn btn-info"
                                
                            >
                                SIGN IN
                            </button>
                        </center>
                    </form>
                </div>
            </React.Fragment>
        );
    }

    handleCategoryChange = event => {
        this.setState({
            category : event.target.value
        });
    }
}

export default Form;