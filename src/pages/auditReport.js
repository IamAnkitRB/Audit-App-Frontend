import React, { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { fetchAuditData } from '../utils/api';
import '../styles/AuditReport.scss';
import ReportDetails from '../components/ReportDetails';

export default function AuditReport({ reportId }) {
  const [auditData, setAuditData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('contacts');
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

  useEffect(() => {
    const fetchData = async () => {
      if (reportId) {
        const response = await fetchAuditData(reportId);
        setAuditData(response);
      }
    };
    fetchData();
  }, [reportId]);

  if (!reportId) {
    return <div>I don't know wat to do.</div>;
  }

  if (!auditData) {
    return <div>Loading report data...</div>;
  }

  const { overallScore, globalAverage, industryAverage, dataAudit } = auditData;

  return (
    <div className="audit-report">
      <header className="audit-report__header">
        <p>Hi Pranav!</p>
      </header>

      {/* Overall Audit Score */}
      <section className="audit-report__section">
        <h3 className="audit-report__overall_title">Overall Audit Score</h3>
        <div className="audit-report__score">
          <ProgressBar score={overallScore} maxScore={100} />
        </div>
        <p className="audit-report__main_heading">
          You are '{globalAverage - overallScore}' points behind the Global
          Average and '{industryAverage - overallScore}' points behind your
          Industry Average.
        </p>
      </section>

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
              <div className="audit-report__data-div">
                <div className="audit-report__data-item">
                  <div className="score-heading">
                    <p className="audit-report__data-div-heading">
                      Data Quality
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 danger-svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                  </div>

                  <p className="audit-report__data-div-score">
                    {dataAudit.contacts ? (
                      <>{dataAudit.contacts}/100</>
                    ) : (
                      <span className="audit-report__unavailable">
                        Not in Use
                      </span>
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
                  <p className="audit-report__data-div-heading">Marketing</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.companies ? (
                      <>?/100</>
                    ) : (
                      <span className="audit-report__unavailable">
                        Not in Use
                      </span>
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
                    {dataAudit.deals ? (
                      <>?/100</>
                    ) : (
                      <span className="audit-report__unavailable">
                        Not in Use
                      </span>
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
                  <p className="audit-report__data-div-heading">Services</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.tickets ? (
                      <>?/100</>
                    ) : (
                      <span className="audit-report__unavailable">
                        Not in Use
                      </span>
                    )}
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
          <div className="audit-report__data">
            <div
              className="audit-report__data-item"
              onClick={() => handleCategoryClick('contacts')}
            >
              <div className="audit-report__data-div">
                <div className="audit-report__data-item">
                  <p className="audit-report__data-div-heading">Contacts</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.contacts}/
                    <span className="audit-report__data-div-hundred">100</span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="audit-report__data-item"
              onClick={() => handleCategoryClick('companies')}
            >
              <div className="audit-report__data-div">
                <div className="audit-report__data-item">
                  <p className="audit-report__data-div-heading">Companies</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.companies}/100
                  </p>
                </div>
              </div>
            </div>
            <div
              className="audit-report__data-item"
              onClick={() => handleCategoryClick('deals')}
            >
              <div className="audit-report__data-div">
                <div className="audit-report__data-item">
                  <p className="audit-report__data-div-heading">Deals</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.deals}/100
                  </p>
                </div>
              </div>
            </div>
            <div
              className="audit-report__data-item"
              onClick={() => handleCategoryClick('tickets')}
            >
              <div className="audit-report__data-div">
                <div className="audit-report__data-item">
                  <p className="audit-report__data-div-heading">Tickets</p>
                  <p className="audit-report__data-div-score">
                    {dataAudit.tickets ? (
                      <>{dataAudit.tickets}/100</>
                    ) : (
                      <span className="audit-report__unavailable">
                        Not in Use
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {expanded && (
        <ReportDetails
          category={selectedCategory}
          data={auditData.dataAudit[selectedCategory]}
        />
      )}
    </div>
  );
}
