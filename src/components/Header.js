import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import '../styles/Header.scss';

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    document.cookie = "state=; Max-Age=0; path=/;";
    window.location.href =
      'https://test-portal-contentninja-6343592.hs-sites.com/audit-app-login';
  };

  return (
    <header className="header">
      <a href='#'>
        <div
          className="header__logo"
          style={{ cursor: 'pointer' }}
        >
          <img
            src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/A-fill-249x300.png"
            alt="Boundary"
            className="header__logo_img"
          />
          <img
            src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/boundary-2.svg"
            alt="Boundary"
            className="header__logo_img_2"
          />
        </div>
      </a>
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
