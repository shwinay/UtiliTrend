import React, { Component } from "react"
import { Bar } from "react-chartjs-2";

const getCost = (dataset) => {
  var set = [];
  for (var i = 0; i < dataset.length; i++) {
    set.push(dataset[i]);
  }
  return set.sort(function(x, y) {
    return x - y;
  });
};

const getRange = (axis_t, intervalCount) => {
  var axis = [];
  for (var i = 0; i < axis_t.length; i++) {
    axis.push(parseFloat(axis_t[i]));
  }
  var set = [];
  var min = axis[0];
  var max = axis[axis.length - 1];
  var step = parseFloat(((max - min) / intervalCount).toFixed(2));
  var lo = parseFloat(min.toFixed(2));
  for (var i = 0; i < intervalCount; i++) {
    var rounded = parseFloat((lo + step).toFixed(2))
    var tuple = [lo, rounded];
    set.push(tuple);
    lo = rounded;
  }
  set[set.length - 1][1] = axis[axis.length - 1];
  return set;
};

function findNumPeopleInRange(data, min, max) {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i] >= min && data[i] <= max) {
      total++;
    }
  }
  return total;
}

const getNumPeople = (dataset, ranges) => {
  var set = [];
  for (var i = 0; i < ranges.length; i++) {
    set.push(findNumPeopleInRange(dataset, ranges[i][0], ranges[i][1]));
  }
  return set;
};

function rangeArrayToStringArray(arr) {
  var strarr = [];
  for (var i = 0; i < arr.length; i++) {
    strarr.push("$" + arr[i][0] + " to $" + arr[i][1]);
  }
  return strarr;
}

const getIndividualIndex = (range, userInfo) => {
  for (var i = 0; i < range.length; i++) {
    var lo = range[i][0];
    var hi = range[i][1];
    if (lo <= userInfo && userInfo <= hi) {
      return i;
    }
  }
};

const getColors = (yourIndex, intervalCount, defaultColor, newColor) => {
  var colorArray = [];
  for (var i = 0; i < intervalCount; i++) {
    colorArray.push(defaultColor);
  }
  colorArray[yourIndex] = newColor;
  return colorArray;
};

const blueLight = "rgba(51, 153, 255, 0.2)";
const blueDark = "rgba(51, 153, 255, 0.4)";
const redLight = "rgba(255,99,132,0.3)";
const redDark = "rgba(255,99,132,0.6)";

class Dashboard extends Component {
  state = {
    data: {},
    formattedData: {},
    userMoney: 0,
    filterToggle: false,
    householdSize: 1
  };
  componentDidMount() {
    this.getData(this.props.username);
  }
  getData = (username) => {
    fetch("/user/" + username)
    .then(res => res.json())
    .then(parsedJSON => {this.setState({
      data: parsedJSON 
    }, () => {
      this.setState({userMoney: parseFloat(this.state.data.User_Cost)}, () => {
        this.formatData();
      })
    });
   })
  }
  formatData = () => {
    console.log(this.state.data);
    console.log(this.state.data.User_Cost)
    let formatted = {
    labels: rangeArrayToStringArray(getRange(getCost(this.state.data.Similar_Costs), 7)),
    datasets: [
      {
        label: "Bills of Similar People Based on Location and Square Footage",
        backgroundColor: getColors(
          getIndividualIndex(getRange(getCost(this.state.data.Similar_Costs), 7), this.state.userMoney),
          7,
          blueLight,
          redLight
        ),
        borderColor: getColors(
          getIndividualIndex(getRange(getCost(this.state.data.Similar_Costs), 7), this.state.userMoney),
          7,
          "rgba(51, 153, 255, 0.8)",
          "rgba(255, 99, 132, 0.8)"
        ),
        hoverBackgroundColor: getColors(
          getIndividualIndex(getRange(getCost(this.state.data.Similar_Costs), 7), this.state.userMoney),
          7,
          blueDark,
          redDark
        ),
        borderWidth: 1,
        hoverBorderColor: getColors(
          getIndividualIndex(getRange(getCost(this.state.data.Similar_Costs), 7), this.state.userMoney),
          7,
          "rgba(51, 153, 255, 1)",
          "rgba(255, 99, 132, 1)"
        ),
        data: getNumPeople(this.state.data.Similar_Costs, getRange(getCost(this.state.data.Similar_Costs), 7))
      }
    ]
    };
    this.setState({formattedData: formatted})
  }
    render() {
      return (
        <div>
          <div class="container">
          <center>
            <h2 className="display-4">Utility Bills in Your Area</h2>
          </center>
          <Bar
            data={this.state.formattedData}
            width={100}
            height={300}
            options={{
              maintainAspectRatio: false,
              scales : {
                yAxes: [{
                  ticks : {
                    beginAtZero: true
                  }
                }]
              },
              legend: {
                labels: {
                  onHover: function(){}
                }
              }
            }}
          />
          </div>
          <center>
          <br />
          <h4 className="display-4" style={{fontSize: "2em"}}>You spent ${this.state.data["User_Cost"]} this month</h4>
          <h4 className="display-4" style={{fontSize: "2em"}}>The average person like you spent ${this.state.data["Average_Similar_Cost"]} this month</h4>
          </center>
          <br />
          <br />
          <center><button className="btn btn-secondary" 
            onClick = { (e) => {
              this.setState({filterToggle : !this.state.filterToggle})
            }}
          >
            Customize Filter Settings
          </button></center>
          {this.getFilterToggle()}
          <br />
        <br />
        </div>
      );
    }

    getFilterToggle() {
      if (!this.state.filterToggle) return;
      return (
        <center>
        <React.Fragment>
          <div class="container">
            <div class="container">
              <input placeholder="Household Size" 
                  className="form-control input m-4"
                  name="householdinput"
                  type="text" value={this.state.householdSize}
                  onChange={(event) => this.setState({householdSize: event.target.value})}
                  size="5"
              />
            </div>
          </div>
          <button className="btn btn-primary">Submit</button>
        </React.Fragment>
        </center>
      )
    }
}
export default Dashboard;