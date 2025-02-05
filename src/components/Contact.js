import React, { useState } from 'react';
import BarChart from './BarChart';

const Contact = ({ score_data }) => {
  const { missing_data, junk_data } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState('withoutFirstName');
  const [secondRowSelectedItem, setSecondRowSelectedItem] =
    useState('withoutDeals');
  const [thirdRowSelectedItem, setThirdRowSelectedItem] =
    useState('withoutJobTitle');

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
        <p>No data available for Contacts.</p>
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
              <div className="report-details__card ">
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'withoutFirstName'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_first_name)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('withoutFirstName');
                  }}
                >
                  <div className="report-details__data-item ">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without First Name</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_first_name}%</strong>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'withoutEmailId'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_email)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('withoutEmailId');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Contacts without Email ID</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_email}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'withoutAssociatedCompany'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_associated_company,
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem('withoutAssociatedCompany');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts with Associated Company</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_company}%
                      </strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === 'withoutOwner'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_owner)}`}
                  onClick={() => {
                    setfirstRowSelectedItem('withoutOwner');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Owners</p>
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
                    secondRowSelectedItem === 'withoutDeals'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_deals)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('withoutDeals');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Deals(Opportunity/Customer)</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_deals}%</strong>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'withoutLeadSource'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_lead_source)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('withoutLeadSource');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Contacts without Lead Source</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_lead_source}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'withoutLifecycleStage'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_lifecycle_stage)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('withoutLifecycleStage');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Lifecycle Stage</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_lifecycle_stage}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === 'withoutLeadStatus'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_lead_status)}`}
                  onClick={() => {
                    setSecondRowSelectedItem('withoutLeadStatus');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Lead status</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_lead_status}%</strong>
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
            <div>
              <div className="report-details__missing_title">
                <p>Good-to-Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'withoutJobTitle'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_job_title)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('withoutJobTitle');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Job Title</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_job_title}%</strong>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'withoutMarketingStatus'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(
                    missing_data?.without_marketing_contact_status,
                  )}`}
                  onClick={() => {
                    setThirdRowSelectedItem('withoutMarketingStatus');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Contacts without Marketing Contact Status</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_marketing_contact_status}%
                      </strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'withLeadScore'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_lead_score)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('withLeadScore');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts with Lead Score</p>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_lead_score}%</strong>
                    </p>
                  </div>
                </div>
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === 'withoutPhoneNumber'
                      ? 'selected-item'
                      : ''
                  }  ${getBorderColor(missing_data?.without_phone)}`}
                  onClick={() => {
                    setThirdRowSelectedItem('withoutPhoneNumber');
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Contacts without Phone No</p>
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
                    <BarChart />
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
                Contacts without Email ID
              </label>
              <label>
                <input type="checkbox" />
                Contacts without Lifecycle Stage
              </label>
              <label>
                <input type="checkbox" />
                Contacts without Phone Numbers
              </label>
              <label>
                <input type="checkbox" />
                Contacts without Owners
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
                    <p>Contacts have no activity in the last 180 days</p>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>{junk_data?.no_activity_in_last_180_days}</strong>
                  </p>
                </div>
              </div>
              <div className="report-details__duplicate-data-div">
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p>Contacts are internal team members</p>
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
                Contacts have no activity in the last 180 days
              </label>
              <label>
                <input type="checkbox" />
                Contacts are internal team members
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
                Contacts have no activity in the last 180 days
              </label>
              <label>
                <input type="checkbox" />
                Contacts are internal team members
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

export default Contact;
