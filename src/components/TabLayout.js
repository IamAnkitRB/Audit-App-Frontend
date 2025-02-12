import React, { useState } from 'react';
import '../styles/TabLayout.scss';

export default function TabLayout({ children, sidebarContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  const childArray = React.Children.toArray(children);

  const toggleSection = (index) => {
    setExpandedSection((prev) => (prev === index ? null : index));
  };

  return (
    <div className="tab-layout">
      <aside className="sidebar">
        <div className="header__logo">
          <a href="#">
            <div className="header__logo" style={{ cursor: 'pointer' }}>
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
        </div>

        <nav className="sidebar-nav">
          {childArray.map((child, index) => (
            <div key={index}>
              <button
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(index);
                  toggleSection(index);
                }}
              >
                {child.props.title || `Tab ${index + 1}`}
              </button>
              {expandedSection === index && (
                <div className="toggle-content">
                  {sidebarContent && sidebarContent[index]}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="content">{childArray[activeTab]}</main>
    </div>
  );
}
