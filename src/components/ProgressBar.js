import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressBar.scss';

const ProgressBar = ({ score, maxScore }) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="progress-bar__score">
        {score}/{maxScore}
      </span>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
};

export default ProgressBar;
