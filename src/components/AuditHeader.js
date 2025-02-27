import React, { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import {
  generateNewReport,
  triggerReportGeneration,
  fetchAuditDataByID,
} from '../utils/api';
import { useAuth } from '../App';
import { DropdownTooltip } from './Tooltip';

const AuditHeader = ({
  userData,
  isGenerating,
  setIsGenerating,
  checkReport,
  setProgress,
  hubId,
  setHubId,
  setAuditData,
}) => {
  const { token } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState(userData?.hub_details || null);
  const [generateButton, setGenerateButton] = useState(isGenerating);
  const [showModal, setShowModal] = useState(false);

  const tooltipText = 'Generating New Report. Please wait!';

  // Disable interactions if a report is generating
  useEffect(() => {
    setGenerateButton(isGenerating);
  }, [isGenerating]);

  // Toggle user dropdown
  const toggleDropdown = () => {
    if (!generateButton) setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (userData?.hub_details) {
      setSelectedHub(userData.hub_details);
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      const latestReportData = userData?.unique_hub_ids.filter((report) => {
        return hubId == report.hub_id;
      });

      const latestReportId = latestReportData[0]?.latest_report_id;

      const result = await fetchAuditDataByID(token, latestReportId);
      console.log('resukt:::', result);
      setAuditData(result);
    };
    fetchData();
  }, [hubId]);

  // Logout & Remove Token
  const handleLogout = () => {
    document.cookie = 'state=; Max-Age=0; path=/;';
    window.location.href =
      'https://test-portal-contentninja-6343592.hs-sites.com/audit-app-login';
  };

  // Handle Hub Selection
  const handleHubSelection = (hub) => {
    if (!generateButton) {
      setSelectedHub(hub);
      setHubId(hub.hub_id);
      setShowDropdown(false);
    }
  };

  // Generate New Report
  const triggerNewReportGeneration = async () => {
    if (!token || !selectedHub?.hub_id) {
      console.error('Missing token or hub ID for report generation');
      return;
    }

    try {
      console.log('Triggering new report with token:', token);
      setGenerateButton(true);
      setShowModal(false);

      const result = await generateNewReport(token, selectedHub.hub_id);

      if (!result.token) {
        throw new Error('Failed to retrieve new token');
      }

      document.cookie = `state=${result.token}; path=/; secure; SameSite=Strict`;

      setTimeout(checkReport, 10000, selectedHub.hub_id, result.token);
      setProgress(2);
      setIsGenerating(true);

      const response = await triggerReportGeneration(
        result.token,
        selectedHub.hub_id,
      );

      if (response) {
        console.log('Report generation started successfully.');
      } else {
        console.error('Failed to start report generation.');
      }
    } catch (error) {
      console.error('Error while triggering new report generation:', error);
    } finally {
      setGenerateButton(false);
    }
  };

  return (
    <header className="audit-report__header">
      <div className="report-header">
        <div>
          <p>Hi {userData?.hub_details?.hs_user}</p>
          <div className="dropdown" style={{ marginTop: '6px' }}>
            <div className="tooltip-container">
              <DropdownTooltip
                hubs={userData?.unique_hub_ids.filter(
                  (hub) => hub.hub_domain !== selectedHub?.hub_domain,
                )}
                handleHubSelection={handleHubSelection}
                generateButton={generateButton}
                token={token}
              >
                <button
                  className="dropdown-toggle"
                  onClick={() =>
                    !generateButton && setShowDropdown(!showDropdown)
                  }
                  disabled={generateButton}
                >
                  Hub ID: {selectedHub?.hub_id} ({selectedHub?.hub_domain})
                </button>
              </DropdownTooltip>
              {generateButton && <span className="tooltip">{tooltipText}</span>}
            </div>

            {/* {showDropdown && (
              <div className="dropdown-menu" ref={dropdownRef}>
                {userData?.unique_hub_ids
                  .filter((hub) => hub.hub_domain !== selectedHub?.hub_domain)
                  .map((hub) => (
                    <div
                      key={hub.hub_id}
                      className="dropdown-item"
                      style={{
                        cursor: generateButton ? 'not-allowed' : 'pointer',
                        opacity: generateButton ? 0.6 : 1,
                      }}
                      onClick={() => handleHubSelection(hub)}
                    >
                      Hub ID: {hub.hub_id}({hub.hub_domain})
                    </div>
                  ))} */}
            {/* <button
                  onClick={() => {
                    if (!generateButton) {
                      window.location.href =
                        `https://app.hubspot.com/oauth/authorize
      ?client_id=2bc2fab4-0ff2-4f13-9400-dc12d07b6dd9
      &redirect_uri=https://enabling-condor-instantly.ngrok-free.app/getcode
      &scope=tickets%20crm.objects.owners.read%20crm.objects.companies.read
      %20crm.objects.deals.read%20crm.objects.contacts.read&state=${token}`.replace(
                          /\s+/g,
                          '',
                        );
                    }
                  }}
                  disabled={generateButton}
                  style={{
                    opacity: generateButton ? 0.6 : 1,
                    cursor: generateButton ? 'not-allowed' : 'pointer',
                  }}
                >
                  + Add New
                </button> */}
            {/* </div> */}
            {/* )} */}
          </div>
        </div>
        <div>
          <button
            className="take_action"
            onClick={() =>
              document
                .getElementById('take_action')
                .scrollIntoView({ behavior: 'smooth' })
            }
          >
            Take Bulk Action ↓
          </button>
          <div className="tooltip-container">
            <button
              className="generate-report-button"
              onClick={() => setShowModal(true)}
              disabled={generateButton}
            >
              {generateButton
                ? 'Generating New Report...'
                : 'Generate New Report'}
            </button>
            {generateButton && <span className="tooltip">{tooltipText}</span>}
          </div>

          <div className="header__user">
            <div
              className="header__user-icon"
              onClick={toggleDropdown}
              style={{ cursor: generateButton ? 'not-allowed' : 'pointer' }}
            >
              <UserCircleIcon className="header__user-heroicon" />
            </div>
            {isDropdownOpen && (
              <div className="header__dropdown">
                <button
                  className="header__dropdown-button"
                  onClick={handleLogout}
                  disabled={generateButton}
                  style={{
                    opacity: generateButton ? 0.6 : 1,
                    cursor: generateButton ? 'not-allowed' : 'pointer',
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>
              You are about to Generate a New Report for Hub:{' '}
              {selectedHub?.hub_id}
            </p>
            <div>
              <p>({selectedHub?.hub_domain})</p>
            </div>

            <button
              onClick={triggerNewReportGeneration}
              className="confirm-btn"
            >
              Confirm
            </button>
            <button onClick={() => setShowModal(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuditHeader;
