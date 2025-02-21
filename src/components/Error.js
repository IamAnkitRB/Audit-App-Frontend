import React from 'react';

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-box">
        <h1>⚠️ Oops! Something Went Wrong</h1>
        <p>
          There seems to be some problem at this moment! Please try again later.
        </p>
        <button onClick={() => window.location.reload()}>🔄 Try Again</button>
      </div>
    </div>
  );
};

export default Error;
