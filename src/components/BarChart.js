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
      label: 'By Source',
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
      label: 'By Owners',
      data: [40, 65, 75, 50, 90, 33, 28, 66, 77, 45],
      backgroundColor: 'rgba(200, 200, 200, 0.5)',
    },
  ],
};

const BarChart = ({ token, reportId, objectType, dataPoint }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('source'); // Toggle state ('source' or 'owners')

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const result = await fetchGraphData(
          token,
          reportId,
          objectType,
          'bar', // assuming graphType is 'bar'
          dataPoint,
        );

        if (result && result.data) {
          const labels = Object.keys(result.data);
          const values = Object.values(result.data);

          setChartData({
            labels,
            datasets: [
              {
                label: dataPoint,
                data: values,
                backgroundColor:
                  view === 'source'
                    ? 'rgba(54, 162, 235, 0.5)'
                    : 'rgba(100, 181, 246, 0.5)',
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
  }, [token, reportId, objectType, dataPoint, view]);

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
      {/* Graph */}
      <div style={{ margin: '0.5rem 0' }}>
        <p className="graph-text">
          A critical gap in data integrity. Without email IDs, outreach,
          automation, and lead nurturing are severely impacted. This
          significantly reduces marketing and sales efficiency, making
          attribution and engagement tracking impossible.
        </p>
        {/* Toggle Switch */}
        <div className="toggle-container">
          <span
            className={view === 'source' ? 'active' : ''}
            onClick={() => setView('source')}
          >
            By Source
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
            By Owners
          </span>
        </div>

        {loading || !chartData ? (
          <div>
            <div style={{ width: '100%', opacity: 0.6, marginLeft: '1.5rem' }}>
              <Bar
                data={view === 'source' ? dummyDataBySource : dummyDataByOwners}
                options={options}
              />
            </div>
            <div className="loading-container">
              <div className="loader"></div>
              <p style={{ fontSize: 'medium' }}>Generating Graph...</p>
            </div>
          </div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>

      {/* Styles */}
      <style>
        {`
        .toggle-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
          width: 65%;
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
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .toggle-slider.right {
          left: 35px;
        }

        .toggle-container span {
          font-size: 1rem;
          color: #777;
          cursor: pointer;
          transition: color 0.3s;
        }

        .toggle-container span.active {
          color: black;
          font-weight: bold;
        }

        .graph-text {
          color: #333;
          font-size: medium;
          text-align: start;
          width: 71%;
          margin-left: 1.6rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          bottom: 22rem;
          justify-content: center;
          height: 360px;
          width: 45rem;
          backdrop-filter: blur(1px);
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
