import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const AuditHeader = ({ onBackClick, showBackButton }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    document.cookie = 'state=; Max-Age=0; path=/;';
    window.location.href =
      'https://test-portal-contentninja-6343592.hs-sites.com/audit-app-login';
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
          <p>Hi Tushar!</p>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Hub ID: 467189 (ritu@contentninja.in) ▼
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
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
