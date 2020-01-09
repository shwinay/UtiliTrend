import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { dummyData } from "./dummy_data"

// const data = {
//   labels: [
//     'Red',
//     'Green',
//     'Yellow',
//     'Brown'
//   ],
//   datasets: [{
//     data: [300, 50, 200, 100],
//     backgroundColor: [
//     '#FF6384',
//     '#36A2EB',
//     '#FFCE56',
//     '#654321'
//     ],
//     hoverBackgroundColor: [
//     '#FF6384',
//     '#36A2EB',
//     '#FFCE56',
//     '#654321'
//     ]
//   }]
// };

const getInfo = (dataset) => {
  var set = []
  for(var i = 0; i < dataset.length; i++){
    set += dataset[i].name
    console.log(dataset[i].name)
  }
  return set
}

const getCost = (dataset) => {
  var set = []
  for(var i = 0; i < dataset.length; i++){
    set.push(dataset[i].avgCost)
  }
  return set.sort(function(x, y) {return x - y})
}

const getRange = (axis, intervalCount) => {
  var set = []
  //var res = [lo,hi]
  var min = axis[0]
  var max = axis[axis.length - 1]
  var step = Math.round((max - min) * 100) / (intervalCount * 100)
  var lo = Math.floor(min)
  for(var i = 0; i < intervalCount; i++){
    var tuple = [lo, lo + step]
    set.push(tuple)
    lo = lo + step
  }
  set[set.length - 1][1] = axis[axis.length - 1]
return set
}

function findNumPeopleInRange(data, min, max) {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].avgCost >= min && data[i].avgCost <= max) {
      console.log(data[i].name + " " + min + "-" + max)
      total++;
    }
  }

  return total
}

const getNumPeople = (dataset, ranges) => {
  var set = []
  for (var i = 0; i < ranges.length; i++) {
    set.push(findNumPeopleInRange(dataset, ranges[i][0], ranges[i][1]))
  }

  return set
} 

function rangeArrayToStringArray(arr) {
  console.log(arr)
  var strarr = []
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i])
    strarr.push(arr[i][0] + "-" + arr[i][1])
  }
  console.log(strarr)

  return strarr
}

console.log(getRange(getCost(dummyData), 5))
console.log(getCost(dummyData))

const data = {
  labels: rangeArrayToStringArray(getRange(getCost(dummyData), 7)),
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      // data: getCost(dummyData),
      data : getNumPeople(dummyData, getRange(getCost(dummyData), 7))
    }
  ]
};

// const App = () => {
//   return ({
//     displayName: 'DoughnutExample',

//     render() {
//       return (
//         <div>
//           <h2>Doughnut Example</h2>
//           <Doughnut data={data} />
//         </div>
//       );
//     }
//   });
// }

const App = () => {
  return ({
    displayName: 'BarExample',

    render() {
      return (
        <div>
          <h2>Bar Example (custom size)</h2>
          <Bar
            data={data}
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
              }
            }}
          />
        </div>
      );
    }
  });
}

export default App;

