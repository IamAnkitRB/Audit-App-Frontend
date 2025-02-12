import React from 'react';
import '../styles/ReportDetails.scss';
import Contact from './Contact';
import Company from './Company';
import Deal from './Deal';
import Ticket from './Ticket';

const ReportDetails = ({ token, category, score_data }) => {
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  if (!score_data) {
    return (
      <div className="report-details">
        <p>No data available for {formattedCategory}.</p>
      </div>
    );
  }

  return (
    <div className="report-details">
      {category.toLowerCase() === 'contacts' && (
        <Contact token={token} score_data={score_data} />
      )}
      {category.toLowerCase() === 'companies' && (
        <Company token={token} score_data={score_data} />
      )}
      {category.toLowerCase() === 'deals' && (
        <Deal token={token} score_data={score_data} />
      )}
      {category.toLowerCase() === 'tickets' && (
        <Ticket token={token} score_data={score_data} />
      )}
    </div>
  );
};

export default ReportDetails;
