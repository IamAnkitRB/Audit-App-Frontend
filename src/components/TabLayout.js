import React, { useState } from 'react';
import '../styles/TabLayout.scss'

export default function TabLayout({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  const childArray = React.Children.toArray(children);

  return (
    <div className="tab-layout">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          {childArray.map((child, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {child.props.title || `Tab ${index + 1}`}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        <div className="content-wrapper">{childArray[activeTab]}</div>
      </main>
    </div>
  );
}
