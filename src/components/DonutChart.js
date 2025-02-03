import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = ({ data }) => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", 
      },
      datalabels: {
        color: "#000",
        font: {
          weight: "bold",
        },
        formatter: (value) => {
          return `${value}`;
        },
      },
    },
    onClick: (event, elements) => {
      if (elements?.length > 0) {
        const index = elements[0]?.index;
        setClickedIndex(clickedIndex === index ? null : index); // Toggle clicked slice
      }
    },
  };

  // Dynamically adjust the `offset` for clicked slice
  const updatedData = {
    ...data,
    datasets: data?.datasets ? data?.datasets?.map((dataset, datasetIndex) => ({
      ...dataset,
      offset: dataset?.data?.map((_, dataIndex) =>
        clickedIndex === dataIndex ? 10 : 0 // Pop-out effect
      ),
    })): [],
  };

  return <Doughnut data={updatedData} options={options} />;
};

export default DonutChart;
