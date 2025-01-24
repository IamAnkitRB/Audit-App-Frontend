import React, { useState } from 'react';
import '../styles/ReportDetails.scss';

const ReportDetails = ({ category, data }) => {
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDuplicateDataExpanded, setIsDuplicateDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);

  category = category.charAt(0).toUpperCase() + category.slice(1)

  const toggleSection = (section) => {
    switch (section) {
      case 'missingData':
        setIsMissingDataExpanded(!isMissingDataExpanded);
        break;
      case 'duplicateData':
        setIsDuplicateDataExpanded(!isDuplicateDataExpanded);
        break;
      case 'deletingData':
        setIsDeletingDataExpanded(!isDeletingDataExpanded);
        break;
    }
  };

  if (!data) {
    return (
      <div className="report-details">
        <p>No data available for {category}.</p>
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
            <div className="report-details__card">
              <div className="report-details__data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>{category} without Email ID</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{data}%</strong>
                  </p>
                </div>
              </div>

              <div className="report-details__data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p> {category} without Phone Numbers</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{data}%</strong>
                  </p>
                </div>
              </div>
              <div className="report-details__data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>{category} with Lifecycle Stage</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{data}%</strong>
                  </p>
                </div>
              </div>
              <div className="report-details__data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>{category} without Owners</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{data}%</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="report-details__take-action">
              <h4 className="report-details__action-title">Take Action</h4>
              <div className="report-details__action-group">
                <h5>1. Create Active Lists</h5>
                <div className="report-details__checkbox-group">
                  <label>
                    <input type="checkbox" />
                    {category} without Email ID
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} without Lifecycle Stage
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} without Phone Numbers
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} without Owners
                  </label>
                </div>
                <div className="report-details__action-button-div">
                  <button className="report-details__action-button">
                    Create Lists
                  </button>
                </div>
              </div>

              <div className="report-details__action-group">
                <h5>2. Create Workflows to Trigger Reminder</h5>
                <div className="report-details__checkbox-group">
                  <label>
                    <input type="checkbox" />
                    {category} without Email ID
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} without Lifecycle Stage
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} without Phone Numbers
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} without Owners
                  </label>
                </div>
                <div className="report-details__action-button-div">
                  <button className="report-details__action-button">
                    Create Workflows
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">Duplicate Data</h3>
          <button
            className="report-details__toggle-button"
            onClick={() => toggleSection('duplicateData')}
          >
            {isDuplicateDataExpanded ? (
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
        {isDuplicateDataExpanded && (
          <>
            <div className="report-details__card">
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>{category} with Similar Email IDs</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{data}%</strong>
                  </p>
                </div>
              </div>
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>{category} with Duplicate Phone Numbers</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{data}%</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="report-details__take-action">
              <h4 className="report-details__action-title">Take Action</h4>
              <div className="report-details__action-group">
                <h5>1. Create Active Lists</h5>
                <div className="report-details__checkbox-group">
                  <label>
                    <input type="checkbox" />
                    {category} with Similar Email Ids
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} with Duplicate Phone Numbers
                  </label>
                </div>
                <div className="report-details__action-button-div">
                  <button className="report-details__action-button">
                    Create Lists
                  </button>
                </div>
              </div>

              <div className="report-details__action-group">
                <h5>2. Create Workflows to Trigger Reminder</h5>
                <div className="report-details__checkbox-group">
                  <label>
                    <input type="checkbox" />
                    Merge {category} with Duplicate Phone Numbers
                  </label>
                </div>
                <div className="report-details__action-button-div">
                  <button className="report-details__action-button">
                    Deduplicate
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </section> */}

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
                    <p>{category} have no activity in the last 180 days</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>1362</strong>
                  </p>
                </div>
              </div>
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>{category} are internal team members</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>19</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="report-details__take-action">
              <h4 className="report-details__action-title">Take Action</h4>
              <div className="report-details__action-group">
                <h5>1. Create Active Lists</h5>
                <div className="report-details__checkbox-group">
                  <label>
                    <input type="checkbox" />
                    {category} have no activity in the last 180 days
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} are internal team members
                  </label>
                </div>
                <div className="report-details__action-button-div">
                  <button className="report-details__action-button">
                    Create Lists
                  </button>
                </div>
              </div>

              <div className="report-details__action-group">
                <h5>2. Create Workflows to Trigger Reminder</h5>
                <div className="report-details__checkbox-group">
                  <label>
                    <input type="checkbox" />
                    {category} have no activity in the last 180 days
                  </label>
                  <label>
                    <input type="checkbox" />
                    {category} are internal team members
                  </label>
                </div>
                <div className="report-details__action-button-div">
                  <button className="report-details__action-button">
                    Delete Junk
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ReportDetails;
