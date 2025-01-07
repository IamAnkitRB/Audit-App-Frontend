import React, { useEffect, useState } from 'react';
import DonutChart from '../components/DonutChart';
import DataTable from '../components/DataTable';
import { fetchCompaniesData } from '../utils/api';
import '../styles/Companies.scss';

export default function Companies() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCompaniesData();
      setData(response);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { totalCompanies, missingData, lifecycleData } = data;

  return (
    <div className="companies">
      <h2 className="companies__title">Companies Report</h2>

      <section className="companies__section">
        <h3 className="companies__subtitle">Missing Data</h3>
        <p className="companies__description">
          There are a total of <strong>{totalCompanies}</strong> companies in
          your CRM. Key missing data includes:
        </p>
        <DataTable
          data={missingData}
          headers={['Property', 'Count', 'Percentage']}
          keys={['property', 'count', 'percentage']}
        />
      </section>

      <section className="companies__section">
        <h3 className="companies__subtitle">Company Lifecycle Stages</h3>
        <div className="companies__chart-container">
          <DonutChart
            data={{
              labels: lifecycleData.labels,
              datasets: [
                {
                  data: lifecycleData.data,
                  backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#C9CBCF',
                  ],
                },
              ],
            }}
          />
        </div>
      </section>
    </div>
  );
}
