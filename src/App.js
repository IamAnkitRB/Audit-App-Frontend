import React, { useState } from 'react';
import './App.scss';
import TabLayout from './components/TabLayout';
import Header from './components/Header';
import AuditReport from './pages/auditReport';
import GenerateReport from './pages/generateReport';

function App() {
  const [activeTab, setActiveTab] = useState('current'); // Tracks active tab
  const reportIds =  [
    { report_id: '001', create_date: '2023-12-01', score: 70 },
    { report_id: '002', create_date: '2023-12-05', score: 65 },
    { report_id: '003', create_date: '2023-12-10', score: 80 },
    { report_id: '004', create_date: '2023-12-15', score: 58 },
  ];

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
        <AuditReport title="Past Reports" reportIdArray={reportIds}/>
      </TabLayout>
    </div>
  );
}

export default App;
