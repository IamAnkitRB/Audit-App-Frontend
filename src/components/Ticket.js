import React, { useState } from 'react';
import BarChart from './BarChart';

const Ticket = ({ token, score_data }) => {
  const { missing_data, junk_data, total_tickets } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState('without_name');
  const [secondRowSelectedItem, setSecondRowSelectedItem] =
    useState('without_priority');
  const [firstDatapoint, setFirstDatapoint] = useState('subject');
  const [secondDataPoint, setSecondDataPoint] = useState('hs_ticket_priority');

  const handleFirstDataPointChange = (dataPoint) => {
    setFirstDatapoint(dataPoint);
  };

  const handleSecondDataPointChange = (dataPoint) => {
    setSecondDataPoint(dataPoint);
  };

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
        <p>No data available for Tickets.</p>
      </div>
    );
  }

  return (
    <div className="report-details">
      {/* Missing Data Section */}
      <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">
            Missing Data - <h4 style={{ marginLeft: '4px' }}>Tickets</h4>
          </h3>
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
                  }  ${getBorderColor(missing_data?.without_name?.percent)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_name');
                    handleFirstDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Name</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_name?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_name?.count}{' '}
                      <span>/ {total_tickets}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_owner'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_owner?.percent)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_owner');
                    handleFirstDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Tickets without Owner</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_owner?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_owner?.count}{' '}
                      <span>/ {total_tickets}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_associated_contacts'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_associated_contacts?.percent,
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_associated_contacts');
                    handleFirstDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets with Associated Contact</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_contacts?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_contacts?.count}{' '}
                      <span>/ {total_tickets}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_associated_company'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_associated_company?.percent,
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_associated_company');
                    handleFirstDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Associated Company</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_company?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_company?.count}{' '}
                      <span>/ {total_tickets}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      token={token}
                      reportId={'1'}
                      objectType={'tickets'}
                      dataPoint={firstDatapoint}
                    />
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
                    secondRowSelectedItem === 'without_priority'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_priority?.percent,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_priority');
                    handleSecondDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Priority</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_priority?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_priority?.count}{' '}
                      <span>/ {total_tickets}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_description'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_description?.percent,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_description');
                    handleSecondDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Tickets without Ticket Description</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_description?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_description?.count}{' '}
                      <span>/ {total_tickets}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_pipeline'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_pipeline_name?.percent,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_pipeline');
                    handleSecondDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Lost Tickets without Pipeline Name</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_pipeline_name?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_pipeline_name?.count}{' '}
                      <span>/ {total_tickets}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_status'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_status?.percent)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_status');
                    handleSecondDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Status</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_status?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_status?.count}{' '}
                      <span>/ {total_tickets}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      token={token}
                      reportId={'1'}
                      objectType={'tickets'}
                      dataPoint={secondDataPoint}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
                    <p>Tickets have no activity in the last 180 days</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.no_activity_in_last_180_days?.count}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>Tickets without name and owner</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{junk_data?.without_name_and_owner?.count}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="audit-report__chart-container">
                <div className="audit-report__chart">
                  <BarChart
                    token={token}
                    reportId={'1'}
                    objectType={'tickets'}
                    dataPoint={firstDatapoint}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <section>
        <div
          className="report-details__take-action report-details__subSection"
          id="take_action"
        >
          <h4 className="report-details__action-title">Take Bulk Action</h4>
          <div className="report-details__action-group">
            {/* <h5>Create Active Lists</h5> */}
            <div className="report-details__list">
              <div className="report-details__checkbox-group">
                <h5>Are You Kidding Me!</h5>
                <label>
                  <input type="checkbox" />
                  Tickets without Name
                </label>
                <label>
                  <input type="checkbox" />
                  Tickets without Owner
                </label>
                <label>
                  <input type="checkbox" />
                  Tickets without Associated Contact
                </label>
                <label>
                  <input type="checkbox" />
                  Tickets without Associated Company
                </label>

                <button>Create Active List</button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Must Have</h5>
                <label>
                  <input type="checkbox" />
                  Tickets without Priority
                </label>
                <label>
                  <input type="checkbox" />
                  Tickets without Ticket Description
                </label>
                <label>
                  <input type="checkbox" />
                  Lost Tickets without Pipeline Name
                </label>
                <label>
                  <input type="checkbox" />
                  Tickets without Status
                </label>

                <button>Create Active List</button>
              </div>
            </div>
          </div>
          <div className="report-details__action-group">
            <div className="report-details__list">
              <div className="report-details__checkbox-group">
                <h5>Consider Deleting</h5>
                <label>
                  <input type="checkbox" />
                  Tickets have no activity in the last 180 days
                </label>
                <label>
                  <input type="checkbox" />
                  Tickets without name and owner
                </label>

                <button>Create Active List</button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Delete Junk</h5>
                <label>
                  <input type="checkbox" />
                  Tickets have no activity in the last 180 days
                </label>
                <label>
                  <input type="checkbox" />
                  Tickets without name and owner
                </label>
                <button>Delete Junk</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ticket;
