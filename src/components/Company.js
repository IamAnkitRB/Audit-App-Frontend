import React, { useState } from 'react';
import BarChart from './BarChart';

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
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_name'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_name?.percent)}`}
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
                      <strong>{missing_data?.without_name?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_name?.count}{' '}
                      <span>/ {total_companies}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'without_domain'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_domain?.percent)}`}
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
                      <strong>{missing_data?.without_domain?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_domain?.count}{' '}
                      <span>/ {total_companies}</span>
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
                    handleFirstDataPointChange('num_associated_contacts');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies with Associated Contact</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_contacts?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_contacts?.count}{' '}
                      <span>/ {total_companies}</span>
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
                    handleFirstDataPointChange('hubspot_owner_id');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without an Owner</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_owner?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_owner?.count}{' '}
                      <span>/ {total_companies}</span>
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
                  }  ${getBorderColor(
                    missing_data?.without_associated_deals?.percent,
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem('without_deals');
                    handleSecondDataPointChange('num_associated_deals');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Deals (Opportunity/Customer)</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_deals?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_deals?.count}{' '}
                      <span>/ {total_companies}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_lead_source'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_lead_source?.percent,
                  )}`}
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
                      <strong>
                        {missing_data?.without_lead_source?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_lead_source?.count}{' '}
                      <span>/ {total_companies}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_lifecycle_stage'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_lifecycle_stage?.percent,
                  )}`}
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
                      <strong>
                        {missing_data?.without_lifecycle_stage?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_lifecycle_stage?.count}{' '}
                      <span>/ {total_companies}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'without_region'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_country_region?.percent,
                  )}`}
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
                      <strong>
                        {missing_data?.without_country_region?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_country_region?.count}{' '}
                      <span>/ {total_companies}</span>
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
                  }  ${getBorderColor(
                    missing_data?.without_num_of_employees?.percent,
                  )}`}
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
                      <strong>
                        {missing_data?.without_num_of_employees?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_num_of_employees?.count}{' '}
                      <span>/ {total_companies}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'without_revenue'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_revenue?.percent)}`}
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
                      <strong>{missing_data?.without_revenue?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_revenue?.count}{' '}
                      <span>/ {total_companies}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'without_linkedin'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_linkedin_url?.percent,
                  )}`}
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
                      <strong>
                        {missing_data?.without_linkedin_url?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_linkedin_url?.count}{' '}
                      <span>/ {total_companies}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'without_phone'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_phone_number?.percent,
                  )}`}
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
                      <strong>
                        {missing_data?.without_phone_number?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_phone_number?.count}{' '}
                      <span>/ {total_companies}</span>
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
                    <p>Companies have no activity in the last 180 days</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.no_activity_in_last_180_days?.count?.toLocaleString()}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>Companies without name and domain</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.without_name_and_domain?.count?.toLocaleString()}
                    </strong>
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
                  Companies without Name
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without Domain
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without Associated Contact
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without an Owner
                </label>

                <button>Create Active List</button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Must Have</h5>
                <label>
                  <input type="checkbox" />
                  Companies without Deals
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without Lead Source
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without Lifecycle Stage
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without Country/Region
                </label>

                <button>Create Active List</button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Good To Have</h5>
                <label>
                  <input type="checkbox" />
                  Companies without Number of Employees
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without Revenue
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without LinkedIn Page URL
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without Phone No
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
                  Company without activity in the last 180 days
                </label>
                <label>
                  <input type="checkbox" />
                  Companies without name and domain
                </label>

                <button>Create Active List</button>
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
