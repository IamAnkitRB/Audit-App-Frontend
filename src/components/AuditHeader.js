import React, { useState } from 'react';

const AuditHeader = ({ onBackClick, showBackButton }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="audit-report__header">
      {showBackButton && (
        <button className="audit-report__back-button" onClick={onBackClick}>
          Go Back
        </button>
      )}

      <div className="report-header">
        <p>Hi Tushar!</p>

        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Hub ID: 467189 (ritu@contentninja.in) ▼
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Add New +</button>
            </div>
          )}
        </div>

        <button className="generate-report-button">Generate New Report</button>
      </div>
    </header>
  );
};

export default AuditHeader;
