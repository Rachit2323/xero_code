import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
// import arrow from "./arrow.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ score }) => {
  
  let remainingScore = 15 - score;
  if(remainingScore<=0)
  {
    score=15;
    remainingScore=0;

  }
  const data = {
    labels: [" ", " "],
    datasets: [
      {
        data: [remainingScore, score],
        backgroundColor: ["rgba(169, 169, 169, 0.6)", "#438AF6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "80px", height: "80px" }}>
      <Pie
        data={data}
        options={{
          cutout: "60%",
          plugins: { legend: { display: false } },
          aspectRatio: 1,
          width: 70,
          height: 70,
        }}
      />
      {/* <img
        src={arrow}
        alt="Center Image"
        style={{
          position: "absolute",
          top: "47%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50px",
          height: "50px",
        }}
      /> */}
      <p
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
 
      </p>
    </div>
  );
};

export default PieChart;
