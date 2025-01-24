import React from "react";

const AuditHeader = ({ onBackClick, showBackButton }) => (
    <header className="audit-report__header">
      {showBackButton && (
        <button className="audit-report__back-button" onClick={onBackClick}>
          Back to Report List
        </button>
      )}
      <p>Hi Pranav!</p>
    </header>
  );
  
  export default AuditHeader;
  