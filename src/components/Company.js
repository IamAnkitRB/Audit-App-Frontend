import React, { useState } from 'react';
import BarChart from './BarChart';
import { Tooltip } from './Tooltip';
import { findRiskImage, getBorderColor } from '../utils/riskManager';

const Company = ({ token, score_data }) => {
  const { missing_data, junk_data, total_companies } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState('without_name');
  const [secondRowSelectedItem, setSecondRowSelectedItem] =
    useState('without_deals');
  const [thirdRowSelectedItem, setThirdRowSelectedItem] = useState(
    'without_employee_count',
  );
  const [firstDatapoint, setFirstDatapoint] = useState('name');
  const [secondDataPoint, setSecondDataPoint] = useState(
    'num_associated_deals',
  );
  const [thirdDataPoint, setThirdDataPoint] = useState('numberofemployees');

  const [activeListSelections, setActiveListSelections] = useState({
    group1: {
      companies_without_name: false,
      companies_without_domain: false,
      companies_without_num_associated_con: false,
      companies_without_owner: false,
    },
    group2: {
      companies_without_associated_deals: false,
      companies_without_industry: false,
      companies_without_lifecycle_stage: false,
      companies_without_country_region: false,
    },
    group3: {
      companies_without_num_of_employee: false,
      companies_without_revenue: false,
      companies_without_linkedin_url: false,
      companies_without_phone_num: false,
    },
    group4: {
      companies_without_name_and_domain: false,
      companies_without_activity_180_days: false,
    },
  });

  const handleFirstDataPointChange = (dataPoint) => {
    setFirstDatapoint(dataPoint);
  };

  const handleSecondDataPointChange = (dataPoint) => {
    setSecondDataPoint(dataPoint);
  };

  const handleThirdDataPointChange = (dataPoint) => {
    setThirdDataPoint(dataPoint);
  };

  const handleCheckboxChange = (group, property, checked) => {
    setActiveListSelections((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [property]: checked,
      },
    }));
  };

  const handleCreateActiveList = async (group) => {
    // Gather selected property names for the group
    const selectedProperties = Object.entries(activeListSelections[group])
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (!selectedProperties.length) {
      alert('Please select at least one property.');
      return;
    }

    // Build the payload; using "company" as the object name in this example.
    const payload = {
      objectname: 'company',
      propertynames: selectedProperties,
    };

    try {
      const response = await fetch(
        'https://enabling-condor-instantly.ngrok-free.app/createlist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            state: token, // pass your token here
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
        <p>No data available for Companies.</p>
      </div>
    );
  }

  return (
    <div className="report-details">
      {/* Missing Data Section */}
      <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">
            Missing Data - <h4 style={{ marginLeft: '4px' }}>Companies</h4>
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
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      firstRowSelectedItem === 'without_name'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(missing_data?.without_name?.risk)}`}
                    onClick={() => {
                      setfirstRowSelectedItem('without_name');
                      handleFirstDataPointChange('name');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p>Companies without Name</p>
                        <img
                          src={findRiskImage(missing_data?.without_name?.risk)}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>{missing_data?.without_name?.percent}%</strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_name?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      firstRowSelectedItem === 'without_domain'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(missing_data?.without_domain?.risk)}`}
                    onClick={() => {
                      setfirstRowSelectedItem('without_domain');
                      handleFirstDataPointChange('domain');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p> Companies without Domain</p>
                        <img
                          src={findRiskImage(
                            missing_data?.without_domain?.risk,
                          )}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>
                          {missing_data?.without_domain?.percent}%
                        </strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_domain?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
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
                        <p>Companies with Associated Contact</p>
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
                        {missing_data?.without_associated_contacts?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
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
                        <p>Companies without an Owner</p>
                        <img
                          src={findRiskImage(missing_data?.without_owner?.risk)}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>{missing_data?.without_owner?.percent}%</strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_owner?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      token={token}
                      reportId={'59'}
                      objectType={'companies'}
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
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      secondRowSelectedItem === 'without_deals'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(
                      missing_data?.without_associated_deals?.risk,
                    )}`}
                    onClick={() => {
                      setSecondRowSelectedItem('without_deals');
                      handleSecondDataPointChange('num_associated_deals');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p>Companies without Deals (Opportunity/Customer)</p>
                        <img
                          src={findRiskImage(
                            missing_data?.without_associated_deals?.risk,
                          )}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>
                          {missing_data?.without_associated_deals?.percent}%
                        </strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_associated_deals?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      secondRowSelectedItem === 'without_industry'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(missing_data?.without_industry?.risk)}`}
                    onClick={() => {
                      setSecondRowSelectedItem('without_industry');
                      handleSecondDataPointChange('industry');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p> Companies without Industry</p>
                        <img
                          src={findRiskImage(
                            missing_data?.without_industry?.risk,
                          )}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>
                          {missing_data?.without_industry?.percent}%
                        </strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_industry?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      secondRowSelectedItem === 'without_lifecycle_stage'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(
                      missing_data?.without_lifecycle_stage?.risk,
                    )}`}
                    onClick={() => {
                      setSecondRowSelectedItem('without_lifecycle_stage');
                      handleSecondDataPointChange('lifecyclestage');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p>Companies without Lifecycle Stage</p>
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
                        {missing_data?.without_lifecycle_stage?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      secondRowSelectedItem === 'without_region'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(
                      missing_data?.without_country_region?.risk,
                    )}`}
                    onClick={() => {
                      setSecondRowSelectedItem('without_region');
                      handleSecondDataPointChange('country');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p>Companies without Country/Region</p>
                        <img
                          src={findRiskImage(
                            missing_data?.without_country_region?.risk,
                          )}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>
                          {missing_data?.without_country_region?.percent}%
                        </strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_country_region?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      token={token}
                      reportId={'59'}
                      objectType={'companies'}
                      dataPoint={secondDataPoint}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="report-details__missing_title">
                <p>Good-to-Have</p>
              </div>
              <div className="report-details__card">
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      thirdRowSelectedItem === 'without_employee_count'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(
                      missing_data?.without_num_of_employees?.risk,
                    )}`}
                    onClick={() => {
                      setThirdRowSelectedItem('without_employee_count');
                      handleThirdDataPointChange('numberofemployees');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p>Companies without Number of Employees</p>
                        <img
                          src={findRiskImage(
                            missing_data?.without_num_of_employees?.risk,
                          )}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>
                          {missing_data?.without_num_of_employees?.percent}%
                        </strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_num_of_employees?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      thirdRowSelectedItem === 'without_revenue'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(missing_data?.without_revenue?.risk)}`}
                    onClick={() => {
                      setThirdRowSelectedItem('without_revenue');
                      handleThirdDataPointChange('annualrevenue');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p> Companies without Revenue</p>
                        <img
                          src={findRiskImage(
                            missing_data?.without_revenue?.risk,
                          )}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>
                          {missing_data?.without_revenue?.percent}%
                        </strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_revenue?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      thirdRowSelectedItem === 'without_linkedin'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(
                      missing_data?.without_linkedin_url?.risk,
                    )}`}
                    onClick={() => {
                      setThirdRowSelectedItem('without_linkedin');
                      handleThirdDataPointChange('linkedin_company_page');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p>Companies with LinkedIn Page URL</p>
                        <img
                          src={findRiskImage(
                            missing_data?.without_linkedin_url?.risk,
                          )}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>
                          {missing_data?.without_linkedin_url?.percent}%
                        </strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_linkedin_url?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                  <div
                    className={`report-details__data-div ${
                      thirdRowSelectedItem === 'without_phone'
                        ? 'selected-item'
                        : ''
                    }  ${getBorderColor(
                      missing_data?.without_phone_number?.risk,
                    )}`}
                    onClick={() => {
                      setThirdRowSelectedItem('without_phone');
                      handleThirdDataPointChange('phone');
                    }}
                  >
                    <div className="report-details__data-item">
                      <p className="report-details__data-div-heading">
                        <p>Companies without Phone No</p>
                        <img
                          src={findRiskImage(
                            missing_data?.without_phone_number?.risk,
                          )}
                        ></img>
                      </p>
                      <p className="report-details__data-div-score">
                        <strong>
                          {missing_data?.without_phone_number?.percent}%
                        </strong>
                      </p>
                      <p className="report-details__data-div-total">
                        {missing_data?.without_phone_number?.count.toLocaleString()}{' '}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Tooltip>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      token={token}
                      reportId={'59'}
                      objectType={'companies'}
                      dataPoint={thirdDataPoint}
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
              <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                <div
                  className={`report-details__duplicate-data-div  ${getBorderColor(
                    junk_data?.no_activity_in_last_180_days?.risk,
                  )}`}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies have no activity in the last 180 days</p>
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
                        {total_companies?.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </Tooltip>
              <Tooltip tooltipText="These contacts are missing their first name which is essential for personalized communication.">
                <div
                  className={`report-details__duplicate-data-div  ${getBorderColor(
                    junk_data?.without_name_and_domain?.risk,
                  )}`}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without name and domain</p>
                      <img
                        src={findRiskImage(
                          junk_data?.without_name_and_domain?.risk,
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {junk_data?.without_name_and_domain?.count?.toLocaleString()}{' '}
                        /
                      </strong>
                      <span
                        style={{
                          fontSize: 'large',
                          fontWeight: '100',
                          color: '#333',
                        }}
                      >
                        {total_companies?.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </Tooltip>
            </div>
            <div>
              <div className="audit-report__chart-container">
                <div className="audit-report__chart">
                  <BarChart
                    token={token}
                    reportId={'59'}
                    objectType={'companies'}
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
          <h4 className="report-details__action-title">Take Action</h4>
          <div className="report-details__action-group">
            <div className="report-details__list">
              {/* Group 1: Are You Kidding Me! */}
              <div className="report-details__checkbox-group">
                <h5>Are You Kidding Me!</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={activeListSelections.group1.companies_without_name}
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group1',
                        'companies_without_name',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Name
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group1.companies_without_domain
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group1',
                        'companies_without_domain',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Domain
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group1
                        .companies_without_num_associated_con
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group1',
                        'companies_without_num_associated_con',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Associated Contact
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group1.companies_without_owner
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group1',
                        'companies_without_owner',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without an Owner
                </label>

                <button onClick={() => handleCreateActiveList('group1')}>
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Must Have</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group2
                        .companies_without_associated_deals
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group2',
                        'companies_without_associated_deals',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Deals
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group2.companies_without_industry
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group2',
                        'companies_without_industry',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Industry
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group2
                        .companies_without_lifecycle_stage
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group2',
                        'companies_without_lifecycle_stage',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Lifecycle Stage
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group2
                        .companies_without_country_region
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group2',
                        'companies_without_country_region',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Country/Region
                </label>

                <button onClick={() => handleCreateActiveList('group2')}>
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Good To Have</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group3
                        .companies_without_num_of_employee
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group3',
                        'companies_without_num_of_employee',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Number of Employees
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group3.companies_without_revenue
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group3',
                        'companies_without_revenue',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Revenue
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group3.companies_without_linkedin_url
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group3',
                        'companies_without_linkedin_url',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without LinkedIn Page URL
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group3.companies_without_phone_num
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group3',
                        'companies_without_phone_num',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without Phone No
                </label>

                <button onClick={() => handleCreateActiveList('group3')}>
                  Create Active List
                </button>
              </div>
            </div>
          </div>
          <div className="report-details__action-group">
            <div className="report-details__list">
              <div className="report-details__checkbox-group">
                <h5>Consider Deleting</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group4
                        .companies_without_activity_180_days
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group4',
                        'companies_without_activity_180_days',
                        e.target.checked,
                      )
                    }
                  />
                  Company without activity in the last 180 days
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group4
                        .companies_without_name_and_domain
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group4',
                        'companies_without_name_and_domain',
                        e.target.checked,
                      )
                    }
                  />
                  Companies without name and domain
                </label>

                <button onClick={() => handleCreateActiveList('group4')}>
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Delete Junk</h5>
                <label>
                  <input type="checkbox" />
                  Company without activity in the last 180 days
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without name and domain
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

export default Company;
