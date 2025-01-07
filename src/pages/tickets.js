import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { fetchTicketsData } from '../utils/api';
import '../styles/Tickets.scss';

export default function Tickets() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTicketsData();
      setData(response);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { totalTickets, ticketStatusData, ticketOwners } = data;

  return (
    <div className="tickets">
      <h2 className="tickets__title">Tickets Report</h2>

      {/* Ticket Status Breakdown */}
      <section className="tickets__section">
        <h3 className="tickets__subtitle">Ticket Status Breakdown</h3>
        <p className="tickets__description">
          There are a total of <strong>{totalTickets}</strong> tickets in your
          CRM. Current status distribution:
        </p>
        <DataTable
          data={ticketStatusData}
          headers={['Status', 'Count']}
          keys={['status', 'count']}
        />
      </section>

      {/* Ticket Owners Breakdown */}
      <section className="tickets__section">
        <h3 className="tickets__subtitle">Ticket Owners Breakdown</h3>
        <p className="tickets__description">
          Below is the breakdown of ticket ownership and resolution rates:
        </p>
        <DataTable
          data={ticketOwners}
          headers={[
            'Ticket Owner',
            'Total Tickets',
            'Resolved',
            'Resolution Rate',
          ]}
          keys={['ticketOwner', 'totalTickets', 'resolved', 'resolutionRate']}
        />
      </section>
    </div>
  );
}
