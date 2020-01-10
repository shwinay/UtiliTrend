import React, { Component } from 'react';

/*
    Jumbotron component for the top of the screen
*/
class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid" style={{background : "#ececec", padding: "0.8em"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <img src={"c1Logo.png"} alt="Capital One" width="420" height="158"></img>
                        </div>
                        <div className="col-4">
                            <h2 className="display-4" style={{paddingTop: "0.75em"}}>Utilitrend</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Jumbotron;