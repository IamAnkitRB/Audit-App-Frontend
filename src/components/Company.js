import React, { useState } from 'react';
import BarChart from './BarChart';

const Company = ({ token, score_data }) => {
  const { missing_data, junk_data } = score_data;
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

  const handleFirstDataPointChange = (dataPoint) => {
    setFirstDatapoint(dataPoint);
  };

  const handleSecondDataPointChange = (dataPoint) => {
    setSecondDataPoint(dataPoint);
  };

  const handleThirdDataPointChange = (dataPoint) => {
    setThirdDataPoint(dataPoint);
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
        <p>No data available for Companies.</p>
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
                    handleFirstDataPointChange('name');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Name</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_name}%</strong>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_domain'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_domain)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_domain');
                    handleFirstDataPointChange('domain');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Companies without Domain</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_domain}%</strong>
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
                    handleFirstDataPointChange('num_associated_contacts');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies with Associated Contact</p>
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
                    firstRowSelectedItem === 'without_owner'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_owner)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('without_owner');
                    handleFirstDataPointChange('hubspot_owner_id');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without an Owner</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_owner}%</strong>
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
                      objectType={'companies'}
                      dataPoint={firstDatapoint}
                    />
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
                    secondRowSelectedItem === 'without_deals'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_deals)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_deals');
                    handleSecondDataPointChange('num_associated_deals');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Deals(Opportunity/Customer)</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_deals}%</strong>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_lead_source'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_lead_source)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_lead_source');
                    handleSecondDataPointChange('lead_source');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Companies without Lead Source</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_lead_source}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_lifecycle_stage'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_lifecycle_stage)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_lifecycle_stage');
                    handleSecondDataPointChange('lifecyclestage');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Lifecycle Stage</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_lifecycle_stage}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_region'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_region)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_region');
                    handleSecondDataPointChange('country');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Country/Region</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_region}%</strong>
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
                      objectType={'companies'}
                      dataPoint={secondDataPoint}
                    />
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
            <div>
              <div className="report-details__missing_title">
                <p>Good-to-Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'without_employee_count'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_employee_count)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('without_employee_count');
                    handleThirdDataPointChange('numberofemployees');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Number of Employees</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_employee_count}%</strong>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'without_revenue'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_revenue)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('without_revenue');
                    handleThirdDataPointChange('annualrevenue');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Companies without Revenue</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_revenue}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'without_linkedin'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_linkedin)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('without_linkedin');
                    handleThirdDataPointChange('linkedin_company_page');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies with LinkedIn Page URL</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_linkedin}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'without_phone'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_phone)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('without_phone');
                    handleThirdDataPointChange('phone');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Phone No</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_phone}%</strong>
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
                      objectType={'companies'}
                      dataPoint={thirdDataPoint}
                    />
                  </div>
                  <div className="audit-report__risk-text">
                    <div className="risk-indicator">
                      <span className="risk-dot-low"></span>
                      <h3>Low Risk</h3>
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
                Companies without Email ID
              </label>
              <label>
                <input type="checkbox" />
                Companies without Lifecycle Stage
              </label>
              <label>
                <input type="checkbox" />
                Companies without Phone Numbers
              </label>
              <label>
                <input type="checkbox" />
                Companies without Owner
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
                    <p>Companies have no activity in the last 180 days</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{junk_data?.no_activity_in_last_180_days}</strong>
                  </p>
                </div>
              </div>
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>Companies are internal team members</p>
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
                Companies have no activity in the last 180 days
              </label>
              <label>
                <input type="checkbox" />
                Companies are internal team members
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
                Companies have no activity in the last 180 days
              </label>
              <label>
                <input type="checkbox" />
                Companies are internal team members
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

export default Company;
