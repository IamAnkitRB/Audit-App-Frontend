import React from 'react';
import '../styles/ReportDetails.scss';
import Contact from './Contact';
import Company from './Company';
import Deal from './Deal';
import Ticket from './Ticket';

const ReportDetails = ({
  token,
  category,
  score_data,
  graphData,
  isGeneratingGraph,
  hubId,
  page,
}) => {
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
        <Contact
          token={token}
          score_data={score_data}
          graphData={graphData?.contacts}
          isGeneratingGraph={isGeneratingGraph}
          hubId={hubId}
          page={page}
        />
      )}
      {category.toLowerCase() === 'companies' && (
        <Company
          token={token}
          score_data={score_data}
          graphData={graphData?.companies}
          isGeneratingGraph={isGeneratingGraph}
          hubId={hubId}
          page={page}
        />
      )}
      {category.toLowerCase() === 'deals' && (
        <Deal
          token={token}
          score_data={score_data}
          graphData={graphData?.deals}
          isGeneratingGraph={isGeneratingGraph}
          hubId={hubId}
          page={page}
        />
      )}
      {category.toLowerCase() === 'tickets' && (
        <Ticket
          token={token}
          score_data={score_data}
          graphData={graphData?.tickets}
          isGeneratingGraph={isGeneratingGraph}
          hubId={hubId}
          page={page}
        />
      )}
    </div>
  );
};

export default ReportDetails;
