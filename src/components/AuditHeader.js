import React from "react";

const AuditHeader = ({ onBackClick, showBackButton }) => (
    <header className="audit-report__header">
      {showBackButton && (
        <button className="audit-report__back-button" onClick={onBackClick}>
          Go Back
        </button>
      )}
      <p>Hi Pranav!</p>
    </header>
  );
  
  export default AuditHeader;
  