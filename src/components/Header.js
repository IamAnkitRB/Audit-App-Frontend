import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import '../styles/Header.scss';

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add logout functionality here
  };

  return (
    <header className="header">
      <div
        className="header__logo"
        onClick={() => window.open('https://boundary.agency', '_blank')}
        style={{ cursor: 'pointer' }}
      >
        <img
          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/boundary-2.svg"
          alt="Boundary"
        />
      </div>
      <div className="header__user">
        <div className="header__user-icon" onClick={toggleDropdown}>
          <UserCircleIcon className="header__user-heroicon" />
        </div>
        {isDropdownOpen && (
          <div className="header__dropdown">
            <button className="header__dropdown-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
