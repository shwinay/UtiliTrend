import React from "react";
// import { Doughnut } from 'react-chartjs-2';
import { Bar } from "react-chartjs-2";
import { dummyData } from "./dummyData";

const getCost = dataset => {
  var set = [];
  for (var i = 0; i < dataset.length; i++) {
    set.push(dataset[i].avgCost);
  }
  return set.sort(function(x, y) {
    return x - y;
  });
};

const getRange = (axis, intervalCount) => {
  var set = [];
  //var res = [lo,hi]
  var min = axis[0];
  var max = axis[axis.length - 1];
  var step = parseFloat(((max - min) / intervalCount).toFixed(2));
  var lo = parseFloat(min.toFixed(2));
  for (var i = 0; i < intervalCount; i++) {
    var tuple = [lo, lo + step];
    set.push(tuple);
    lo = lo + step;
  }
  set[set.length - 1][1] = axis[axis.length - 1];
  return set;
};

function findNumPeopleInRange(data, min, max) {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].avgCost >= min && data[i].avgCost <= max) {
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

const userMoney = 15.32;
const blueLight = "rgba(51, 153, 255, 0.2)";
const blueDark = "rgba(51, 153, 255, 0.4)";
const redLight = "rgba(255,99,132,0.3)";
const redDark = "rgba(255,99,132,0.6)";

const data = {
  labels: rangeArrayToStringArray(getRange(getCost(dummyData), 7)),
  datasets: [
    {
      label: "People in Interval",
      backgroundColor: getColors(
        getIndividualIndex(getRange(getCost(dummyData), 7), userMoney),
        7,
        blueLight,
        redLight
      ),
      borderColor: getColors(
        getIndividualIndex(getRange(getCost(dummyData), 7), userMoney),
        7,
        "rgba(51, 153, 255, 0.8)",
        "rgba(255, 99, 132, 0.8)"
      ),
      hoverBackgroundColor: getColors(
        getIndividualIndex(getRange(getCost(dummyData), 7), userMoney),
        7,
        blueDark,
        redDark
      ),
      borderWidth: 1,
      hoverBorderColor: getColors(
        getIndividualIndex(getRange(getCost(dummyData), 7), userMoney),
        7,
        "rgba(51, 153, 255, 1)",
        "rgba(255, 99, 132, 1)"
      ),
      data: getNumPeople(dummyData, getRange(getCost(dummyData), 7))
    }
  ]
};

const App = () => {
  return {
    displayName: "Util_Distribution",

    render() {
      return (
        <div>
          <h2>How You Match Up to Spenders in Your Area</h2>
          <Bar
            data={data}
            width={100}
            height={300}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        </div>
      );
    }
  };
};

export default App;
