import React, { Component } from "react"

//class that displays the search form for the website
class Form extends Component {

    state = {
        category : "",
        difficulty: "all",
        startDate: new Date(1990, 1, 1),
        endDate: new Date()
    }

    render() {
        return (
            <React.Fragment>
                <div className="container" style={{maxWidth : "600px"}}>
                    <form onSubmit={event => {event.preventDefault()}}>
                        <center>
                            <input placeholder="Enter Question Category" 
                                className="form-control input m-4"
                                type="text" value={this.state.category}
                                size="25" onChange={this.handleCategoryChange}
                            />
                            <select className="form-control m-4" onChange={event => 
                            this.setState({
                                    difficulty: (event.target.value == "All Difficulties" ? "all" : event.target.value)
                                })}
                            >
                                <option>All Difficulties</option>
                                {this.getDifficultyOptions()}
                            </select>
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

    getDifficultyOptions() {
        let difficulties = [200, 400, 600, 800, 1000, 1200, 1600, 2000];
        let options = [];
        for (let i = 0; i < difficulties.length; i ++) {
            options.push(<option>{difficulties[i]}</option>)
        };
        return options;
    }
}

export default Form;