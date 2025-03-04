import React, { useState } from 'react';
import BarChart from './BarChart';
import { Tooltip } from './Tooltip';
import { findRiskImage, getBorderColor } from '../utils/riskManager';

const Ticket = ({ token, score_data, graphData }) => {
  const { missing_data, junk_data, total_tickets } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState('without_name');
  const [secondRowSelectedItem, setSecondRowSelectedItem] =
    useState('without_priority');
  const [firstDatapoint, setFirstDatapoint] = useState('subject');
  const [secondDataPoint, setSecondDataPoint] = useState('hs_ticket_priority');
  const [lastDataPoint, setLastDataPoint] = useState(
    'no_activity_in_last_180_days',
  );

  const [ticketActiveListSelections, setTicketActiveListSelections] = useState({
    group1: {
      tickets_without_name: false,
      tickets_without_owner: false,
      tickets_without_num_associated_company: false,
    },
    group2: {
      tickets_without_priority: false,
      tickets_without_description: false,
      tickets_without_pipeline_name: false,
      tickets_without_status: false,
    },
    group3: {
      tickets_without_name_and_owner: false,
      tickets_without_activity_180: false,
    },
    group4: {
      tickets_without_name_and_owner: false,
      tickets_with_no_activity_in_last_180_days: false,
    },
  });

  const handleTicketCheckboxChange = (group, key, checked) => {
    setTicketActiveListSelections((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: checked,
      },
    }));
  };

  const handleCreateTicketActiveList = async (group) => {
    const selectedKeys = Object.entries(ticketActiveListSelections[group])
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (!selectedKeys.length) {
      alert('Please select at least one property.');
      return;
    }

    const payload = {
      objectname: 'ticket',
      propertynames: selectedKeys,
    };

    try {
      const response = await fetch(
        'https://enabling-condor-instantly.ngrok-free.app/createlist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            state: token,
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert('Active list(s) created successfully!');
      } else {
        alert('Error creating active list: ' + data.error);
      }
    } catch (error) {
      console.error('API error:', error);
      alert('Network error. Please try again later.');
    }
  };

  const handleFirstDataPointChange = (dataPoint) => {
    setFirstDatapoint(dataPoint);
  };

  const handleSecondDataPointChange = (dataPoint) => {
    setSecondDataPoint(dataPoint);
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

  const handleDeleteActiveList = async (group) => {
    const selectedProperties = Object.entries(ticketActiveListSelections[group])
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (!selectedProperties.length) {
      alert('Please select at least one property.');
      return;
    }

    // Build the payload; using "company" as the object name in this example.
    const payload = {
      objectname: 'tickets',
      propertynames: selectedProperties,
    };

    try {
      const response = await fetch(
        'https://enabling-condor-instantly.ngrok-free.app/deleterecords',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            state: token,
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (response.ok) {
        console.log('Items Deleted successfully!');
      } else {
        console.log('Error creating active list: ' + data.error);
      }
    } catch (error) {
      console.error('API error:', error);
      alert('Network error. Please try again later.');
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
                  }  ${getBorderColor(missing_data?.without_name?.risk)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_name');
                    handleFirstDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Name</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_name?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_name?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_name?.count?.toLocaleString()}{' '}
                      <span>/ {total_tickets?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_owner'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_owner?.risk)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_owner');
                    handleFirstDataPointChange('hubspot_owner_id');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Tickets without Owner</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_owner?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_owner?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_owner?.count?.toLocaleString()}{' '}
                      <span>/ {total_tickets?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_associated_contacts'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_associated_contacts?.risk,
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_associated_contacts');
                    handleFirstDataPointChange('hs_num_associated_companies');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Associated Contact</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_associated_contacts?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_contacts?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_contacts?.count?.toLocaleString()}{' '}
                      <span>/ {total_tickets?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_associated_company'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_associated_company?.risk,
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_associated_company');
                    handleFirstDataPointChange('hs_num_associated_companies');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Associated Company</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_associated_company?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_company?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_company?.count?.toLocaleString()}{' '}
                      <span>/ {total_tickets?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      graphData={graphData}
                      dataPoint={firstDatapoint}
                      missingData={missing_data}
                      inferenceKey={firstRowSelectedItem}
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
                  }  ${getBorderColor(missing_data?.without_priority?.risk)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_priority');
                    handleSecondDataPointChange('hs_ticket_priority');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Priority</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_priority?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_priority?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_priority?.count?.toLocaleString()}{' '}
                      <span>/ {total_tickets?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_description'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_description?.risk,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_description');
                    handleSecondDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Tickets without Ticket Description</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_description?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_description?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_description?.count?.toLocaleString()}{' '}
                      <span>/ {total_tickets?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_pipeline_name'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_pipeline_name?.risk,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_pipeline_name');
                    handleSecondDataPointChange('hs_pipeline');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Lost Tickets without Pipeline Name</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_pipeline_name?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_pipeline_name?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_pipeline_name?.count?.toLocaleString()}{' '}
                      <span>/ {total_tickets?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_status'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_status?.risk)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_status');
                    handleSecondDataPointChange('subject');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Tickets without Status</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_status?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_status?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_status?.count?.toLocaleString()}{' '}
                      <span>/ {total_tickets?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      graphData={graphData}
                      dataPoint={secondDataPoint}
                      missingData={missing_data}
                      inferenceKey={secondRowSelectedItem}
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
              <div
                className={`report-details__duplicate-data-div  ${getBorderColor(
                  junk_data?.no_activity_in_last_180_days?.risk,
                )} ${
                  lastDataPoint === 'no_activity_in_last_180_days'
                    ? 'selected-item'
                    : ''
                }  `}
                onClick={() => {
                  setLastDataPoint('no_activity_in_last_180_days');
                }}
              >
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p style={{ width: 'inherit' }}>
                      Tickets have no activity in the last 180 days
                    </p>
                    <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                      <img
                        className="info-image"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                      />
                    </Tooltip>
                    <img
                      src={findRiskImage(
                        junk_data?.no_activity_in_last_180_days?.risk,
                      )}
                    ></img>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.no_activity_in_last_180_days?.count?.toLocaleString()}{' '}
                      /
                    </strong>
                    <span
                      style={{
                        fontSize: 'large',
                        fontWeight: '100',
                        color: '#333',
                      }}
                    >
                      {total_tickets?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <div
                className={`report-details__duplicate-data-div  ${getBorderColor(
                  junk_data?.without_name_and_owner?.risk,
                )} ${
                  lastDataPoint === 'without_name_and_owner'
                    ? 'selected-item'
                    : ''
                }  `}
                onClick={() => {
                  setLastDataPoint('without_name_and_owner');
                }}
              >
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p style={{ width: 'inherit' }}>
                      Tickets without name and owner
                    </p>
                    <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                      <img
                        className="info-image"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                      />
                    </Tooltip>
                    <img
                      src={findRiskImage(
                        junk_data?.without_name_and_owner?.risk,
                      )}
                    ></img>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.without_name_and_owner?.count?.toLocaleString()}{' '}
                      /
                    </strong>
                    <span
                      style={{
                        fontSize: 'large',
                        fontWeight: '100',
                        color: '#333',
                      }}
                    >
                      {total_tickets?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {lastDataPoint == 'no_activity_in_last_180_days' && (
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      graphData={graphData}
                      dataPoint={lastDataPoint}
                      missingData={junk_data}
                      inferenceKey={lastDataPoint}
                    />
                  </div>
                </div>
              </div>
            )}
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
            <div className="report-details__list_main">
              {/* Group 1: Are You Kidding Me! */}
              <div className="report-details__checkbox-group">
                <h5>Are You Kidding Me!</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group1.tickets_without_name
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group1',
                        'tickets_without_name',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without Name
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group1.tickets_without_owner
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group1',
                        'tickets_without_owner',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without Owner
                </label>
                {/* <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group1
                        .tickets_without_num_associated_contact
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group1',
                        'tickets_without_num_associated_contact',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without Associated Contact
                </label> */}
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group1
                        .tickets_without_num_associated_company
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group1',
                        'tickets_without_num_associated_company',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without Associated Company
                </label>
                <button onClick={() => handleCreateTicketActiveList('group1')}>
                  Create Active List
                </button>
              </div>

              {/* Group 2: Must Have */}
              <div className="report-details__checkbox-group">
                <h5>Must Have</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group2.tickets_without_priority
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group2',
                        'tickets_without_priority',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without Priority
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group2
                        .tickets_without_description
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group2',
                        'tickets_without_description',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without Ticket Description
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group2
                        .tickets_without_pipeline_name
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group2',
                        'tickets_without_pipeline_name',
                        e.target.checked,
                      )
                    }
                  />
                  Lost Tickets without Pipeline Name
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group2.tickets_without_status
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group2',
                        'tickets_without_status',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without Status
                </label>
                <button onClick={() => handleCreateTicketActiveList('group2')}>
                  Create Active List
                </button>
              </div>
            </div>
          </div>
          <div className="report-details__action-group">
            <div className="report-details__list_main">
              {/* Group 3: Consider Deleting */}
              <div className="report-details__checkbox-group">
                <h5>Consider Deleting</h5>
                {/* <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group3
                        .tickets_without_activity_180
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group3',
                        'tickets_without_activity_180',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets have no activity in the last 180 days
                </label> */}
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group3
                        .tickets_without_name_and_owner
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group3',
                        'tickets_without_name_and_owner',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without name and owner
                </label>
                <button onClick={() => handleCreateTicketActiveList('group3')}>
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Delete Junk</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group4
                        .tickets_with_no_activity_in_last_180_days
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group4',
                        'tickets_with_no_activity_in_last_180_days',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets have no activity in the last 180 days
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      ticketActiveListSelections.group4
                        .tickets_without_name_and_owner
                    }
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        'group4',
                        'tickets_without_name_and_owner',
                        e.target.checked,
                      )
                    }
                  />
                  Tickets without name and owner
                </label>
                <button onClick={() => handleDeleteActiveList('group4')}>
                  Delete Junk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ticket;
