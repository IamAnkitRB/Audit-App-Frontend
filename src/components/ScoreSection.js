import React, { useEffect, useState } from 'react';
import { ReportProgressBar } from './ProgressBar';
import ReportDetails from './ReportDetails';
import { findRiskImageForObject } from '../utils/riskManager';

const ScoreSection = ({
  token,
  overall_audit_score = { score: 0, global_average_difference: 0 },
  object_scores = {},
  score_breakdown = {},
  data_audit = {},
  graphData,
}) => {
  console.log('graph data', graphData);
  const [selectedCategory, setSelectedCategory] = useState('contacts');
  const [overall_score, setOverallScore] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(true);

  const toggleSection = () => {
    toggleExpanded();
    setIsExpanded(!isExpanded);
  };
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const toggleScoreSection = () => {
    setIsBreakdownExpanded(!isBreakdownExpanded);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const displayOrder = ['contacts', 'companies', 'deals', 'tickets'];
  const sortedEntries = Object.entries(object_scores).sort(
    ([keyA], [keyB]) => displayOrder.indexOf(keyA) - displayOrder.indexOf(keyB),
  );

  useEffect(() => {
    setOverallScore(overall_audit_score?.score);
  }, [overall_audit_score]);

  let borderColorClass = '';
  if (score_breakdown?.data_quality?.score === null) {
    borderColorClass = 'border-red';
  } else if (score_breakdown?.data_quality?.score < 40) {
    borderColorClass = 'border-red';
  } else if (
    score_breakdown?.data_quality?.score >= 40 &&
    score_breakdown?.data_quality?.score <= 90
  ) {
    borderColorClass = 'border-orange';
  } else {
    borderColorClass = 'border-green';
  }

  return (
    <>
      {/* Overall Audit Score */}
      <section className="audit-report__section">
        <h3 className="audit-report__overall_title">Overall Audit Score</h3>
        <div className="audit-report__score">
          <ReportProgressBar score={overall_score} maxScore={100} />
        </div>
        <p className="audit-report__main_heading">
          You are{' '}
          <strong>
            {Math.abs(overall_audit_score?.global_average_difference)}{' '}
          </strong>
          points{' '}
          {overall_audit_score?.global_average_difference > 0
            ? 'ahead of'
            : 'behind'}{' '}
          the Global Average.
        </p>
      </section>

      {/* Score Breakdown */}
      <section className="audit-report__subSection">
        <div className="audit-report__section-header">
          <h3 className="audit-report__subtitle">Score Breakdown</h3>
          <button
            className="audit-report__toggle-button"
            onClick={toggleScoreSection}
          >
            {isBreakdownExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                class="size-5"
                style={{ height: '15px' }}
              >
                <path
                  fill-rule="evenodd"
                  d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                class="size-5"
                style={{ height: '15px' }}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        {isBreakdownExpanded && (
          <div className="audit-report__data">
            <div className="audit-report__data-item">
              <div
                className={`audit-report__data-div ${borderColorClass} selected-item`}
              >
                <div className="audit-report__data-item">
                  <div className="score-heading">
                    <p className="audit-report__data-div-heading">
                      Data Quality
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    {score_breakdown?.data_quality?.score ? (
                      <>
                        <p className="audit-report__data-div-score">
                          {score_breakdown?.data_quality?.score}/100
                        </p>
                        <img
                          src={findRiskImageForObject(
                            score_breakdown?.data_quality?.score,
                          )}
                        ></img>
                      </>
                    ) : (
                      <span className="audit-report__unavailable">
                        Not in Use
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="audit-report__data-item glassmorhp">
              <div className="audit-report__data-div">
                <div className="audit-report__data-item">
                  <span className="coming-soon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Coming Soon
                  </span>
                  <p className="audit-report__data-div-heading">Marketing</p>
                  <p className="audit-report__data-div-score">
                    {score_breakdown?.marketing?.score ? (
                      <>?/100</>
                    ) : (
                      <>?/100</>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="audit-report__data-item glassmorhp">
              <div className="audit-report__data-div">
                <div className="audit-report__data-item">
                  <span className="coming-soon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Coming Soon
                  </span>
                  <p className="audit-report__data-div-heading">Sales</p>
                  <p className="audit-report__data-div-score">
                    {score_breakdown?.sales?.score ? <>?/100</> : <>?/100</>}
                  </p>
                </div>
              </div>
            </div>
            <div className="audit-report__data-item glassmorhp">
              <div className="audit-report__data-div">
                <div className="audit-report__data-item">
                  <span className="coming-soon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Coming Soon
                  </span>
                  <p className="audit-report__data-div-heading">Services</p>
                  <p className="audit-report__data-div-score">
                    {score_breakdown?.service?.score ? <>?/100</> : <>?/100</>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Data Audit Section */}
      <section className="audit-report__subSection">
        <div className="audit-report__section-header">
          <h3 className="audit-report__subtitle">Data Audit</h3>
          <button
            className="audit-report__toggle-button"
            onClick={toggleSection}
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                class="size-5"
                style={{ height: '15px' }}
              >
                <path
                  fill-rule="evenodd"
                  d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                class="size-5"
                style={{ height: '15px' }}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="audit-report__data" id="data_audit">
            {sortedEntries.map(([key, value]) => {
              const formattedKey =
                key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
              let borderColorClass = '';
              if (value < 40) {
                borderColorClass = 'border-red';
              } else if (value >= 40 && value <= 90) {
                borderColorClass = 'border-orange';
              } else {
                borderColorClass = 'border-green';
              }

              return (
                <div
                  key={key}
                  className={`audit-report__data-item`}
                  onClick={() => handleCategoryClick(key)}
                  style={{ textAlign: 'left' }}
                >
                  <div
                    className={`audit-report__data-div  ${borderColorClass} ${
                      selectedCategory === key ? 'selected-item' : ''
                    }`}
                  >
                    <p className="audit-report__data-div-heading">
                      {formattedKey}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {' '}
                      <p className="audit-report__data-div-score">
                        {value !== null ? `${value}/100` : 'Not in Use'}
                      </p>
                      <img src={findRiskImageForObject(value)}></img>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {expanded && (
        <ReportDetails
          token={token}
          category={selectedCategory}
          score_data={data_audit[selectedCategory]}
          graphData={graphData}
        />
      )}
    </>
  );
};

export default ScoreSection;
