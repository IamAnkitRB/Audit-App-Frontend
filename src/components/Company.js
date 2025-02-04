import React, { useState } from 'react';
import BarChart from './BarChart';

const Company = ({ score_data }) => {
  const { missing_data, junk_data } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [isDoughnutChartVisible, setIsDoughnutChartVisible] = useState(true);

  const doughnutChartData = {
    labels: [
      'Subscriber',
      'Lead',
      'MQL',
      'SQL',
      'Opportunity',
      'Customer',
      'Evangelist',
      'Other',
    ],
    datasets: [
      {
        label: "Company Stages",
        data: [50000, 85000, 200, 45, 40000, 39800, 30000, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(104, 132, 245, 0.5)',
          'rgba(201, 203, 207, 0.5)',
        ],
      },
    ],
  };

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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutFirstName');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutEmailId');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutAssociatedCompany');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutOwner');
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
                {isDoughnutChartVisible && (
                  <div className="audit-report__chart-container">
                    <div className="audit-report__chart">
                      <BarChart data={doughnutChartData} />
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
                )}
              </div>
            </div>
            <div>
              <div className="report-details__missing_title">
                <p>Must-Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutDeals');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutLeadSource');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutLifecycleStage');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutLeadStatus');
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
                {isDoughnutChartVisible && (
                  <div className="audit-report__chart-container">
                    <div className="audit-report__chart">
                      <BarChart data={doughnutChartData} />
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
                )}
              </div>
            </div>
            <div>
              <div className="report-details__missing_title">
                <p>Good-to-Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutJobTitle');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutTags');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutLeadSource');
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
                  className="report-details__data-div"
                  onClick={() => {
                    toggleBarChartVisibility('withoutPhoneNumber');
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
                {isDoughnutChartVisible && (
                  <div className="audit-report__chart-container">
                    <div className="audit-report__chart">
                      <BarChart data={doughnutChartData} />
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
                )}
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
          </>
        )}
      </section>
    </div>
  );
};

export default Company;
