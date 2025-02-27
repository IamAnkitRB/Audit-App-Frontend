import React, { useState } from 'react';
import BarChart from './BarChart';
import { Tooltip } from './Tooltip';
import { findRiskImage, getBorderColor } from '../utils/riskManager';

const Deal = ({ token, score_data, reportId }) => {
  const { missing_data, junk_data, total_deals } = score_data;
  const [firstDatapoint, setFirstDatapoint] = useState('dealname');
  const [secondDataPoint, setSecondDataPoint] = useState('closedate');
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState('without_name');
  const [secondRowSelectedItem, setSecondRowSelectedItem] =
    useState('without_close_date');

  const [dealActiveListSelections, setDealActiveListSelections] = useState({
    group1: {
      deals_without_name: false,
      deals_without_owner: false,
      deals_without_num_associated_con: false,
      deals_without_num_associated_comp: false,
    },
    group2: {
      deals_without_closing_date: false,
      deals_without_amount: false,
      deals_lost_without_lost_reason: false,
      deals_without_deal_type: false,
    },
    group3: {
      deals_without_name_and_owner: false,
      deals_without_activity_180: false,
    },
  });

  const handleDealCheckboxChange = (group, key, checked) => {
    setDealActiveListSelections((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: checked,
      },
    }));
  };

  const handleCreateDealActiveList = async (group) => {
    const selectedKeys = Object.entries(dealActiveListSelections[group])
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (!selectedKeys.length) {
      alert('Please select at least one property.');
      return;
    }

    const payload = {
      objectname: 'deal',
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
          <h3 className="report-details__subtitle">
            Missing Data - <h4 style={{ marginLeft: '4px' }}>Deals</h4>
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
                    handleFirstDataPointChange('dealname');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Name</p>
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
                      <span>/ {total_deals?.toLocaleString()}</span>
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
                      <p> Deals without Owner</p>
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
                      <span>/ {total_deals?.toLocaleString()}</span>
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
                    handleFirstDataPointChange('num_associated_contacts');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals with Associated Contact</p>
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
                      <span>/ {total_deals?.toLocaleString()}</span>
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
                    handleFirstDataPointChange('associations.company');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Associated Company</p>
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
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      token={token}
                      reportId={reportId}
                      objectType={'deals'}
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
                    secondRowSelectedItem === 'without_close_date'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_closing_date?.risk,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_close_date');
                    handleSecondDataPointChange('closedate');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Close Date</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_closing_date?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_closing_date?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_closing_date?.count?.toLocaleString()}{' '}
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_amount'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_amount?.risk)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_amount');
                    handleSecondDataPointChange('amount');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Deals without Amount</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_amount?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_amount?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_amount?.count?.toLocaleString()}{' '}
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_lost_reason'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.lost_without_reason?.risk,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_lost_reason');
                    handleSecondDataPointChange('amount');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Lost Deals without Lost Reason</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.lost_without_reason?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.lost_without_reason?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.lost_without_reason?.count?.toLocaleString()}{' '}
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_type'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_deal_type?.risk)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_type');
                    handleSecondDataPointChange('dealtype');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Deal Type</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_deal_type?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_deal_type?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_deal_type?.count?.toLocaleString()}{' '}
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      token={token}
                      reportId={reportId}
                      objectType={'deals'}
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
              <div
                className={`report-details__duplicate-data-div  ${getBorderColor(
                  junk_data?.no_activity_in_last_180_days?.risk,
                )}`}
              >
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p style={{ width: 'inherit' }}>
                      Deals have no activity in the last 180 days
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
                      {total_deals?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <div
                className={`report-details__duplicate-data-div  ${getBorderColor(
                  junk_data?.without_name_and_owner?.risk,
                )}`}
              >
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p style={{ width: 'inherit' }}>
                      Deals without name and owner
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
                      {total_deals?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="audit-report__chart-container">
                <div className="audit-report__chart">
                  <BarChart
                    token={token}
                    reportId={reportId}
                    objectType={'deals'}
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
            <div className="report-details__list">
              {/* Group 1: Are You Kidding Me! */}
              <div className="report-details__checkbox-group">
                <h5>Are You Kidding Me!</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={dealActiveListSelections.group1.deals_without_name}
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group1',
                        'deals_without_name',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Name
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group1.deals_without_owner
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group1',
                        'deals_without_owner',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Owner
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group1
                        .deals_without_num_associated_con
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group1',
                        'deals_without_num_associated_con',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Associated Contact
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group1
                        .deals_without_num_associated_comp
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group1',
                        'deals_without_num_associated_comp',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Associated Company
                </label>
                <button onClick={() => handleCreateDealActiveList('group1')}>
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
                      dealActiveListSelections.group2.deals_without_closing_date
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group2',
                        'deals_without_closing_date',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Closing Date
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group2.deals_without_amount
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group2',
                        'deals_without_amount',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Amount
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group2
                        .deals_lost_without_lost_reason
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group2',
                        'deals_lost_without_lost_reason',
                        e.target.checked,
                      )
                    }
                  />
                  Lost Deals without Lost Reason
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group2.deals_without_deal_type
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group2',
                        'deals_without_deal_type',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Deal Type
                </label>
                <button onClick={() => handleCreateDealActiveList('group2')}>
                  Create Active List
                </button>
              </div>
            </div>
          </div>
          <div className="report-details__action-group">
            <div className="report-details__list">
              {/* Group 3: Consider Deleting */}
              <div className="report-details__checkbox-group">
                <h5>Consider Deleting</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group3.deals_without_activity_180
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group3',
                        'deals_without_activity_180',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without activity in the last 180 days
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group3
                        .deals_without_name_and_owner
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group3',
                        'deals_without_name_and_owner',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Name and Owner
                </label>
                <button onClick={() => handleCreateDealActiveList('group3')}>
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Delete Junk</h5>
                <label>
                  <input type="checkbox" />
                  Deals without activity in the last 180 days
                </label>
                <label>
                  <input type="checkbox" />
                  Deals without Name and Owner
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

export default Deal;
