import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const doughnutChartData = {
  labels: [
    'Subscriber',
    'Lead',
    'MQL',
    'SQL',
    'Opportunity',
    'Customer',
    'Evangelist',
    'Other',
  ],
  datasets: [
    {
      label: 'Contact Stages',
      data: [50000, 85000, 200, 45, 40000, 39800, 30000, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(104, 132, 245, 0.5)',
        'rgba(201, 203, 207, 0.5)',
      ],
    },
  ],
};

const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: false,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={doughnutChartData} options={options} />;
};

export default BarChart;
