import React, { useState } from 'react';
import BarChart from './BarChart';
import { findRiskImage, getBorderColor } from '../utils/riskManager';
import { Tooltip } from './Tooltip';

const Contact = ({ token, score_data, graphData }) => {
  const { missing_data, junk_data, total_contacts } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState('withoutFirstName');
  const [secondRowSelectedItem, setSecondRowSelectedItem] =
    useState('withoutDeals');
  const [thirdRowSelectedItem, setThirdRowSelectedItem] =
    useState('withoutJobTitle');
  const [firstDatapoint, setFirstDatapoint] = useState('firstname');
  const [secondDataPoint, setSecondDataPoint] = useState(
    'num_associated_deals',
  );
  const [thirdDataPoint, setThirdDataPoint] = useState('jobtitle');

  const [contactActiveListSelections, setContactActiveListSelections] =
    useState({
      group1: {
        no_firstname: false,
        no_email: false,
        no_associated_company: false,
        no_owner: false,
      },
      group2: {
        no_associated_deals: false,
        no_lead_source: false,
        no_lifecycle_stage: false,
        no_lead_status: false,
      },
      group3: {
        no_jobtitle: false,
        no_market_status: false,
        no_hubspotscore: false,
        no_phone: false,
      },
      group4: {
        no_name_and_domain: false,
        no_activity_180: false,
      },
    });

  const handleContactCheckboxChange = (group, key, checked) => {
    setContactActiveListSelections((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: checked,
      },
    }));
  };

  const handleCreateContactActiveList = async (group) => {
    const selectedKeys = Object.entries(contactActiveListSelections[group])
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (!selectedKeys.length) {
      alert('Please select at least one property.');
      return;
    }

    const payload = {
      objectname: 'contact',
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
        console.log('Active list(s) created successfully!');
      } else {
        console.log('Error creating active list: ' + data.error);
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

  const handleThirdDataPointChange = (dataPoint) => {
    setThirdDataPoint(dataPoint);
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
        <p>No data available for Contacts.</p>
      </div>
    );
  }

  return (
    <div className="report-details">
      {/* Missing Data Section */}
      <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">
            Missing Data - <h4 style={{ marginLeft: '4px' }}>Contacts</h4>
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
              <div className="report-details__card ">
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'withoutFirstName'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_first_name?.risk)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('withoutFirstName');
                    handleFirstDataPointChange('firstname');
                  }}
                >
                  <div className="report-details__data-item ">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without First Name</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_first_name?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_first_name?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_first_name?.count.toLocaleString()}{' '}
                      <span>/ {total_contacts.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'withoutEmailId'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_email?.risk)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('withoutEmailId');
                    handleFirstDataPointChange('email');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Email ID</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(missing_data?.without_email?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_email?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_email?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'withoutAssociatedCompany'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_associated_company?.risk,
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem('withoutAssociatedCompany');
                    handleFirstDataPointChange('associatedcompanyid');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Associated Company</p>
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
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'withoutOwner'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_owner?.risk)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('withoutOwner');
                    handleFirstDataPointChange('hubspot_owner_id');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Owners</p>
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
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      dataPoint={firstDatapoint}
                      graphData={graphData}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="report-details__missing_title">
                <p>Must Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'withoutDeals'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_deals?.risk)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('withoutDeals');
                    handleSecondDataPointChange('num_associated_deals');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Deals (Opportunity/Customer)</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(missing_data?.without_deals?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_deals?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_deals?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'withoutLeadSource'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_lead_source?.risk,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('withoutLeadSource');
                    handleSecondDataPointChange('deals');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Contacts without Lead Source</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(
                          missing_data?.without_lead_source?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_lead_source?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_lead_source?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'withoutLifecycleStage'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_lifecycle_stage?.risk,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('withoutLifecycleStage');
                    handleSecondDataPointChange('lifecyclestage');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Lifecycle Stage</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(
                          missing_data?.without_lifecycle_stage?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_lifecycle_stage?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_lifecycle_stage?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'withoutLeadStatus'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_lead_status?.risk,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('withoutLeadStatus');
                    handleSecondDataPointChange('hs_lead_status');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Lead status</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(
                          missing_data?.without_lead_status?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_lead_status?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_lead_status?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts?.toLocaleString()}</span>
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
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="report-details__missing_title">
                <p>Good To Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'withoutJobTitle'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_job_title?.risk)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('withoutJobTitle');
                    handleThirdDataPointChange('jobtitle');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Job Title</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(
                          missing_data?.without_job_title?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_job_title?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_job_title?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'withoutMarketingStatus'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_marketing_contact_status?.risk,
                  )}`}
                  onClick={() => {
                    setThirdRowSelectedItem('withoutMarketingStatus');
                    handleThirdDataPointChange('hs_marketable_status');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Contacts without Marketing Status</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(
                          missing_data?.without_marketing_contact_status?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {
                          missing_data?.without_marketing_contact_status
                            ?.percent
                        }
                        %
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_marketing_contact_status?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'withLeadScore'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_lead_score?.risk)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('withLeadScore');
                    handleThirdDataPointChange('hubspotscore');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Lead Score</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(
                          missing_data?.without_lead_score?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_lead_score?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_lead_score?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'withoutPhoneNumber'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_phone?.risk)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('withoutPhoneNumber');
                    handleThirdDataPointChange('phone');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Phone No</p>
                      <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>

                      <img
                        src={findRiskImage(missing_data?.without_phone?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_phone?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_phone?.count?.toLocaleString()}{' '}
                      <span>/ {total_contacts?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      graphData={graphData}
                      dataPoint={thirdDataPoint}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="report-details__duplicate_subSection">
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
                      Contacts have no activity in the last 180 days
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
                      {total_contacts?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <div
                className={`report-details__duplicate-data-div  ${getBorderColor(
                  junk_data?.internal_team_members?.risk,
                )}`}
              >
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p style={{ width: 'inherit' }}>
                      Contacts are internal team members
                    </p>
                    <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                      <img
                        className="info-image"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                      />
                    </Tooltip>
                    <img
                      src={findRiskImage(
                        junk_data?.internal_team_members?.risk,
                      )}
                    ></img>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.internal_team_members?.count?.toLocaleString()}{' '}
                      /
                    </strong>
                    <span
                      style={{
                        fontSize: 'large',
                        fontWeight: '100',
                        color: '#333',
                      }}
                    >
                      {total_contacts?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="audit-report__chart-container">
                <div className="audit-report__chart">
                  <BarChart graphData={graphData} dataPoint={firstDatapoint} />
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
                    checked={contactActiveListSelections.group1.no_firstname}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group1',
                        'no_firstname',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without First Name
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={contactActiveListSelections.group1.no_email}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group1',
                        'no_email',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Email ID
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      contactActiveListSelections.group1.no_associated_company
                    }
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group1',
                        'no_associated_company',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Associated Company
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={contactActiveListSelections.group1.no_owner}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group1',
                        'no_owner',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Owner
                </label>
                <button onClick={() => handleCreateContactActiveList('group1')}>
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
                      contactActiveListSelections.group2.no_associated_deals
                    }
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group2',
                        'no_associated_deals',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Deals
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={contactActiveListSelections.group2.no_lead_source}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group2',
                        'no_lead_source',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Lead Source
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      contactActiveListSelections.group2.no_lifecycle_stage
                    }
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group2',
                        'no_lifecycle_stage',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Lifecycle Stage
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={contactActiveListSelections.group2.no_lead_status}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group2',
                        'no_lead_status',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Lead Status
                </label>
                <button onClick={() => handleCreateContactActiveList('group2')}>
                  Create Active List
                </button>
              </div>

              {/* Group 3: Good To Have */}
              <div className="report-details__checkbox-group">
                <h5>Good To Have</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={contactActiveListSelections.group3.no_jobtitle}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group3',
                        'no_jobtitle',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Job Title
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      contactActiveListSelections.group3.no_market_status
                    }
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group3',
                        'no_market_status',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Marketing Status
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={contactActiveListSelections.group3.no_hubspotscore}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group3',
                        'no_hubspotscore',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Lead Score
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={contactActiveListSelections.group3.no_phone}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group3',
                        'no_phone',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts without Phone No
                </label>
                <button onClick={() => handleCreateContactActiveList('group3')}>
                  Create Active List
                </button>
              </div>
            </div>
          </div>
          {/* You can keep or adjust the Consider Deleting / Delete Junk groups as needed */}
          <div className="report-details__action-group">
            <div className="report-details__list">
              <div className="report-details__checkbox-group">
                <h5>Consider Deleting</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={contactActiveListSelections.group4.no_activity_180}
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group4',
                        'no_activity_180',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts have no activity in the last 180 days
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      contactActiveListSelections.group4.internal_members
                    }
                    onChange={(e) =>
                      handleContactCheckboxChange(
                        'group4',
                        'internal_members',
                        e.target.checked,
                      )
                    }
                  />
                  Contacts are internal team members
                </label>
                <button onClick={() => handleCreateContactActiveList('group4')}>
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Delete Junk</h5>
                <label>
                  <input type="checkbox" />
                  Contacts have no activity in the last 180 days
                </label>
                <label>
                  <input type="checkbox" />
                  Contacts are internal team members
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

export default Contact;
