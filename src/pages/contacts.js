import React, { useEffect, useState } from 'react';
import DonutChart from '../components/DonutChart';
import DataTable from '../components/DataTable';
import { fetchContactsData } from '../utils/api';
import '../styles/Contacts.scss'; 

export default function Contacts() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchContactsData();
      setData(response);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { totalContacts, missingData, lifecycleData } = data;

  return (
    <div className="contacts">
      <h2 className="contacts__title">Contacts Report</h2>

      <section className="contacts__section">
        <h3 className="contacts__subtitle">Missing Data</h3>
        <p className="contacts__description">
          There are a total of <strong>{totalContacts}</strong> contacts in your CRM. Out of these, the following do not
          have the essential properties populated:
        </p>
        <DataTable
  data={missingData}
  headers={['Property', 'Count', 'Percentage']}
  keys={['property', 'count', 'percentage']}
/>

      </section>

      <section className="contacts__section">
        <h3 className="contacts__subtitle">Customer Journey - Lifecycle Stages</h3>
        <div className="contacts__chart-container">
          <DonutChart
            data={{
              labels: lifecycleData.labels,
              datasets: [
                {
                  data: lifecycleData.data,
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'],
                },
              ],
            }}
          />
        </div>
      </section>
    </div>
  );
}
