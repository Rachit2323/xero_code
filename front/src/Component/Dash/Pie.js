import React from "react";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend);

const PieChart = ({ score }) => {
  let remainingScore = 100 - score;
  

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
        {`${score}%`}
      </p>
    </div>
  );
};

export default PieChart;
