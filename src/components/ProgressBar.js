import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressBar.scss';

const ReportProgressBar = ({ score, maxScore }) => {
  const percentage = (score / maxScore) * 100;
  const [trackColor, setTrackColor] = useState('red');

  useEffect(() => {
    const calculateTrackColor = (percentage) => {
      if (percentage < 35) {
        setTrackColor('red');
      } else if (percentage < 60) {
        setTrackColor('#fcad03');
      } else {
        setTrackColor('#4caf50');
      }
    };
    calculateTrackColor(percentage);
  }, [percentage]);

  return (
    <div className="progress-bar">
      <div className="progress-bar__labels">
        <span className="progress-bar__label">0</span>
        <span className="progress-bar__score">
          {score}/{maxScore}
        </span>
        <span className="progress-bar__label">100</span>
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%`, backgroundColor: `${trackColor}` }}
        ></div>
      </div>
    </div>
  );
};

ReportProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
};

const GeneratingProgressBar = ({ progress }) => {
  return (
    <div className="generating-progress-container">
      <p className="generating-progress-text">Generating Report: {progress}%</p>
      <div className="generating-progress-bar">
        <div
          className="generating-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export { ReportProgressBar, GeneratingProgressBar };
