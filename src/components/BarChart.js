import React, { useState, useEffect } from 'react';
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
import { fetchGraphData } from '../utils/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ token, reportId, objectType, dataPoint }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const result = await fetchGraphData(
          token,
          reportId,
          objectType,
          dataPoint,
        );

        if (result && result.data) {
          const labels = Object.keys(result.data);
          const values = Object.values(result.data);

          setChartData({
            labels,
            datasets: [
              {
                label: dataPoint, // Use the dataPoint as the label
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData(null);
      }
    };

    fetchChartData();
  }, [token, reportId, objectType, dataPoint]); // Dependencies to trigger re-fetching

  const options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return (
    <div>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default BarChart;
