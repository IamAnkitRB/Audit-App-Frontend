import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressBar.scss';

const ProgressBar = ({ score, maxScore, height }) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__track" style={{ height: `${height}rem` }}>
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-bar__details">
        <span>0</span>
        <span>{score}</span>
        <span>{maxScore}</span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
};

export default ProgressBar;
