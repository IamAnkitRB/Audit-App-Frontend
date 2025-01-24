import React, { useState } from 'react';
import './App.scss';
import TabLayout from './components/TabLayout';
import Header from './components/Header';
import AuditReport from './pages/auditReport';
import GenerateReport from './pages/generateReport';

function App() {
  const [activeTab, setActiveTab] = useState('current'); 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="cms-react-boilerplate__container min-h-screen bg-gray-50">
      <Header />
      <TabLayout
        sidebarContent={
          <div className="sidebar">
            {/* Tab Buttons */}
            <button
              onClick={() => handleTabChange('current')}
              className={`sidebar-button ${activeTab === 'current' ? 'active' : ''}`}
            >
              Current Report
            </button>
            <button
              onClick={() => handleTabChange('past')}
              className={`sidebar-button ${activeTab === 'past' ? 'active' : ''}`}
            >
              Past Reports
            </button>

           
          </div>
        }
      >
        {/* Main Content */}
        <GenerateReport title="Current Report" />
        <AuditReport title="Past Reports"/>
      </TabLayout>
    </div>
  );
}

export default App;
