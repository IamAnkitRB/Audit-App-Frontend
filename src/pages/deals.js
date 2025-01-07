import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import BarChart from '../components/BarChart';
import { fetchDealsData } from '../utils/api';
import '../styles/Deals.scss';

export default function Deals() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDealsData();
      setData(response);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { totalDeals, dealPipelines } = data;

  // Prepare Bar Chart Data
  const barChartData = {
    labels: dealPipelines.map((pipeline) => pipeline.dealOwner),
    datasets: [
      {
        label: 'Total Deals',
        data: dealPipelines.map((pipeline) => pipeline.totalDeals),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light blue
      },
      {
        label: 'Deals Won',
        data: dealPipelines.map((pipeline) => pipeline.dealsWon),
        backgroundColor: 'rgba(153, 102, 255, 0.6)', // Light purple
      },
    ],
  };

  return (
    <div className="deals">
      <h2 className="deals__title">Deals Report</h2>

      {/* DataTable Section */}
      <section className="deals__section">
        <h3 className="deals__subtitle">Deals by Owner</h3>
        <p className="deals__description">
          There are a total of <strong>{totalDeals}</strong> deals in your CRM.
          Below is the breakdown by deal owner:
        </p>
        <DataTable
          data={dealPipelines}
          headers={['Deal Owner', 'Total Deals', 'Deals Won', 'Win Rate']}
          keys={['dealOwner', 'totalDeals', 'dealsWon', 'winRate']}
        />
      </section>

      {/* Bar Chart Section */}
      <section className="deals__section">
        <h3 className="deals__subtitle">Deal Pipelines Overview</h3>
        <BarChart data={barChartData} />
      </section>
    </div>
  );
}
