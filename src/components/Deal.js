import React, { useState } from 'react';
import BarChart from './BarChart';

const Deal = ({ score_data }) => {
  const { missing_data, junk_data } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState('without_name');
  const [secondRowSelectedItem, setSecondRowSelectedItem] =
    useState('without_close_date');

  const getBorderColor = (score) => {
    if (score <= 15) return 'border-green';
    if (score <= 65) return 'border-orange';
    return 'border-red';
  };

  const toggleSection = (section) => {
    switch (section) {
      case 'missingData':
        setIsMissingDataExpanded(!isMissingDataExpanded);
        break;
      case 'deletingData':
        setIsDeletingDataExpanded(!isDeletingDataExpanded);
        break;
    }
  };

  if (!score_data) {
    return (
      <div className="report-details">
        <p>No data available for Deals.</p>
      </div>
    );
  }

  return (
    <div className="report-details">
      {/* Missing Data Section */}
      <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">Missing Data</h3>
          <button
            className="report-details__toggle-button"
            onClick={() => toggleSection('missingData')}
          >
            {isMissingDataExpanded ? (
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
        {isMissingDataExpanded && (
          <>
            <div>
              <div className="report-details__missing_title">
                <p>Are you kidding me!</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_name'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_name)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_name');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Name</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_name}%</strong>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_owner'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_owner)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_owner');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Deals without Owner</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_owner}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_associated_contacts'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_associated_contacts,
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_associated_contacts');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals with Associated Contact</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_contacts}%
                      </strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_associated_company'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_associated_company,
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_associated_company');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Associated Company</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_company}%
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart />
                  </div>
                  <div className="audit-report__risk-text">
                    <div className="risk-indicator">
                      <span className="risk-dot-high"></span>
                      <h3>High Risk</h3>
                    </div>
                    <p>
                      A critical gap in data integrity. Without email IDs,
                      outreach, automation, and lead nurturing are severely
                      impacted. This significantly reduces marketing and sales
                      efficiency, making attribution and engagement tracking
                      impossible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="report-details__missing_title">
                <p>Must-Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_close_date'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_close_date)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_close_date');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Close Date</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_close_date}%</strong>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_amount'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_amount)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_amount');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Deals without Amount</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_amount}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_lost_reason'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_lost_reason)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_lost_reason');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Lost Deals without Lost Reason</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_lost_reason}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_type'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_type)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_type');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Deal Type</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_type}%</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart />
                  </div>
                  <div className="audit-report__risk-text">
                    <div className="risk-indicator">
                      <span className="risk-dot-medium"></span>
                      <h3>Medium Risk</h3>
                    </div>
                    <p>
                      A critical gap in data integrity. Without email IDs,
                      outreach, automation, and lead nurturing are severely
                      impacted. This significantly reduces marketing and sales
                      efficiency, making attribution and engagement tracking
                      impossible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <section>
        <div className="report-details__take-action">
          <h4 className="report-details__action-title">Take Action</h4>
          <div className="report-details__action-group">
            <h5>1. Create Active Lists</h5>
            <div className="report-details__checkbox-group">
              <label>
                <input type="checkbox" />
                Deals without Email ID
              </label>
              <label>
                <input type="checkbox" />
                Deals without Lifecycle Stage
              </label>
              <label>
                <input type="checkbox" />
                Deals without Phone Numbers
              </label>
              <label>
                <input type="checkbox" />
                Deals without Owners
              </label>
            </div>
            <div className="report-details__action-button-div">
              <button className="report-details__action-button">
                Create Lists
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">Consider Deleting</h3>
          <button
            className="report-details__toggle-button"
            onClick={() => toggleSection('deletingData')}
          >
            {isDeletingDataExpanded ? (
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
        {isDeletingDataExpanded && (
          <>
            <div className="report-details__card">
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>Deals have no activity in the last 180 days</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{junk_data?.no_activity_in_last_180_days}</strong>
                  </p>
                </div>
              </div>
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>Deals are internal team members</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{junk_data?.internal_team_members}</strong>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <section>
        <div className="report-details__take-action">
          <h4 className="report-details__action-title">Take Action</h4>
          <div className="report-details__action-group">
            <h5>1. Create Active Lists</h5>
            <div className="report-details__checkbox-group">
              <label>
                <input type="checkbox" />
                Deals have no activity in the last 180 days
              </label>
              <label>
                <input type="checkbox" />
                Deals are internal team members
              </label>
            </div>
            <div className="report-details__action-button-div">
              <button className="report-details__action-button">
                Create Lists
              </button>
            </div>
          </div>

          <div className="report-details__action-group">
            <h5>2. Delete Junk Data</h5>
            <div className="report-details__checkbox-group">
              <label>
                <input type="checkbox" />
                Deals have no activity in the last 180 days
              </label>
              <label>
                <input type="checkbox" />
                Deals are internal team members
              </label>
            </div>
            <div className="report-details__action-button-div">
              <button className="report-details__action-button">
                Delete Junk
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deal;
