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
