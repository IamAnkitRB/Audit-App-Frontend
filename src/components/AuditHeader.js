import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const AuditHeader = ({ onBackClick, showBackButton, userData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // State to track the selected hub
  const [selectedHub, setSelectedHub] = useState(userData?.hub_details);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    document.cookie = 'state=; Max-Age=0; path=/;';
    window.location.href =
      'https://test-portal-contentninja-6343592.hs-sites.com/audit-app-login';
  };

  // Handle hub selection
  const handleHubSelection = (hub) => {
    setSelectedHub(hub);
    setShowDropdown(false); // Close dropdown after selection
  };

  return (
    <header className="audit-report__header">
      {showBackButton && (
        <button className="audit-report__back-button" onClick={onBackClick}>
          Go Back
        </button>
      )}

      <div className="report-header">
        <div className="report-header__child">
          <p>Hi {userData?.hub_details?.hs_user}</p>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Hub ID: {selectedHub?.hub_id} ({selectedHub?.hub_domain}) ▼
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                {userData?.unique_hub_ids
                  .filter((hub) => hub.hub_domain !== selectedHub?.hub_domain)
                  .map((hub) => (
                    <div
                      key={hub.hub_id}
                      className="dropdown-item"
                      style={{ textAlign: 'center', cursor: 'pointer' }}
                      onClick={() => handleHubSelection(hub)}
                    >
                      Hub ID: {hub.hub_id}
                    </div>
                  ))}
                <button className="dropdown-item">+ Add New</button>
              </div>
            )}
          </div>
        </div>
        <div className="report-header__child">
          <button className="generate-report-button">
            Generate New Report
          </button>
          <div className="header__user">
            <div className="header__user-icon" onClick={toggleDropdown}>
              <UserCircleIcon className="header__user-heroicon" />
            </div>
            {isDropdownOpen && (
              <div className="header__dropdown">
                <button
                  className="header__dropdown-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuditHeader;
