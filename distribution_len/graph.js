import React from "react";
// import { Doughnut } from 'react-chartjs-2';
import { Bar } from "react-chartjs-2";
import { dummyData } from "./dummy_data";

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

const getInfo = dataset => {
  var set = [];
  for (var i = 0; i < dataset.length; i++) {
    set += dataset[i].name;
  }
  return set;
};

const getCost = dataset => {
  var set = [];
  for (var i = 0; i < dataset.length; i++) {
    set += dataset[i].avgCost;
  }
  return set;
};

const data = {
  labels: getInfo(dummyData),
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: getCost(dummyData)
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
  return {
    displayName: "BarExample",

    render() {
      return (
        <div>
          <h2>Bar Example (custom size)</h2>
          <Bar
            data={data}
            width={100}
            height={300}
            options={{ 
              maintainAspectRatio: false
            }}
          />
        </div>
      );
    }
  };
};

export default App;
