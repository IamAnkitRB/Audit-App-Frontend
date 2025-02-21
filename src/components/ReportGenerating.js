import React from 'react';
import { GeneratingProgressBar } from '../components/ProgressBar';

const ReportGenerate = ({ progress }) => {
  return (
    <>
      <GeneratingProgressBar progress={progress} />
      <div className="generating-state">
        <div className="generating-title">
          <p>
            <span style={{ color: '#ff5c35' }}>Sit Tight! </span>
            <span>
              Your report is being generated and will be displayed soon
            </span>
          </p>

          <div className="loading-icon">
            <img
              src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/platform_GIF.gif"
              alt="Loading"
            />
          </div>
        </div>

        <p className="beta-notice">
          <em>This automated HubSpot auditor is currently in beta.</em>
        </p>
        <p className="feedback-link">
          We’re a small team working hard to build value-driven products for the
          HubSpot ecosystem. If you face any challenges, please{' '}
          <a href="#">drop us a note</a> or{' '}
          <a href="#">restart the process here</a>.
        </p>
      </div>
    </>
  );
};

export default ReportGenerate;
