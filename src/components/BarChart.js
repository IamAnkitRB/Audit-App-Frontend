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

// Dummy Data for By Source & By Owners
const dummyDataBySource = {
  labels: [
    'Organic Search',
    'Paid Search',
    'Email Marketing',
    'Social Media',
    'Referrals',
    'Other Campaigns',
    'Direct Traffic',
    'Offline',
    'Paid Social',
    'Unknown',
  ],
  datasets: [
    {
      label: 'Via Source',
      data: [23, 87, 59, 75, 11, 55, 1, 95, 62, 51],
      backgroundColor: 'rgba(200, 200, 200, 0.5)',
    },
  ],
};

const dummyDataByOwners = {
  labels: [
    'Owner A',
    'Owner B',
    'Owner C',
    'Owner D',
    'Owner E',
    'Owner F',
    'Owner G',
    'Owner H',
    'Owner I',
    'Owner J',
  ],
  datasets: [
    {
      label: 'Via Owners',
      data: [40, 65, 75, 50, 90, 33, 28, 66, 77, 45],
      backgroundColor: 'rgba(200, 200, 200, 0.5)',
    },
  ],
};

const BarChart = ({ token, reportId, objectType, dataPoint }) => {
  const [chartDataBySource, setChartDataBySource] = useState(null);
  const [chartDataByOwners, setChartDataByOwners] = useState(null);
  const [view, setView] = useState('source'); // Toggle state ('source' or 'owners')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const result = await fetchGraphData(
          token,
          reportId,
          objectType,
          'owner', // assuming graphType is 'bar'
          dataPoint,
          'High Risk',
        );

        if (result && result.data) {
          // Data for "By Source"
          const labelsBySource = Object.keys(
            result.data.graph_data_by_source[dataPoint],
          );
          const valuesBySource = Object.values(
            result.data.graph_data_by_source[dataPoint],
          );

          setChartDataBySource({
            labels: labelsBySource,
            datasets: [
              {
                label: `By Source - ${dataPoint}`,
                data: valuesBySource,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
              },
            ],
          });

          const ownersData = Object.entries(
            result.data.graph_data_by_owner[dataPoint],
          );

          ownersData.sort((a, b) => b[1] - a[1]);

          const topOwners = ownersData.slice(0, 9);
          const remainingOwners = ownersData.slice(9);

          const othersValue = remainingOwners.reduce(
            (sum, owner) => sum + owner[1],
            0,
          );

          const labelsByOwners = topOwners.map((owner) => owner[0]);
          const valuesByOwners = topOwners.map((owner) => owner[1]);

          if (othersValue > 0) {
            labelsByOwners.push('Others');
            valuesByOwners.push(othersValue);
          }

          setChartDataByOwners({
            labels: labelsByOwners,
            datasets: [
              {
                label: `Via Owners - ${dataPoint}`,
                data: valuesByOwners,
                backgroundColor: 'rgba(100, 181, 246, 0.5)',
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, [token, reportId, objectType, dataPoint]);

  const options = {
    responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          color: '#000',
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: '#000',
          align: 'start',
          padding: 5,
          callback: function (value) {
            return this.getLabelForValue(value)
              .replace(/_/g, ' ')
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase());
          },
        },
      },
    },
  };

  return (
    <div>
      <p className="graph-text">
        A critical gap in data integrity. Without email IDs, outreach,
        automation, and lead nurturing are severely impacted. This significantly
        reduces marketing and sales efficiency, making attribution and
        engagement tracking impossible.
      </p>
      {/* Toggle Switch */}
      <div className="toggle-container">
        <span
          className={view === 'source' ? 'active' : ''}
          onClick={() => setView('source')}
        >
          Via Source
        </span>
        <div
          className="toggle-switch"
          onClick={() => setView(view === 'source' ? 'owners' : 'source')}
        >
          <div
            className={`toggle-slider ${view === 'owners' ? 'right' : ''}`}
          ></div>
        </div>
        <span
          className={view === 'owners' ? 'active' : ''}
          onClick={() => setView('owners')}
        >
          Via Owners
        </span>
      </div>

      {/* Graph */}
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <Bar
            data={view === 'source' ? dummyDataBySource : chartDataByOwners}
            options={options}
          />
          <p>Generating Graph...</p>
        </div>
      ) : (
        <Bar
          data={
            view === 'source'
              ? chartDataBySource || dummyDataBySource
              : chartDataByOwners || dummyDataByOwners
          }
          options={options}
        />
      )}

      {/* Styles */}
      <style>
        {`
        .toggle-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }

        .toggle-switch {
          width: 60px;
          height: 25px;
          background: #ddd;
          border-radius: 50px;
          position: relative;
          margin: 0 10px;
          cursor: pointer;
        }

        .toggle-slider {
          width: 25px;
          height: 25px;
          background: black;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          transition: 0.3s;
        }

        .toggle-slider.right {
          left: 35px;
        }

        .toggle-container span {
          font-size: 1rem;
          cursor: pointer;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 200px;
          justify-content: center;
        }

        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #007BFF;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}
      </style>
    </div>
  );
};

export default BarChart;
