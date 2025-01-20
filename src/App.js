import React, { useState } from 'react';
import './App.scss';
import TabLayout from './components/TabLayout';
import Header from './components/Header';
import AuditReport from './pages/auditReport';

function App() {
  const reportIds = ['001', '002', '003', '004'];

  const [selectedReportId, setSelectedReportId] = useState(reportIds[0]);

  const handleReportClick = (id) => {
    setSelectedReportId(id);
  };
  // Sidebar content for each tab
  const sidebarContent = [
    <div>
      {reportIds.map((id) => (
        <div
          key={id}
          onClick={() => handleReportClick(id)}
          className="report-button"
        >
          {id}
        </div>
      ))}
    </div>,
  ];
  return (
    <div className="cms-react-boilerplate__container min-h-screen bg-gray-50">
      <Header />
      <TabLayout sidebarContent={sidebarContent}>
        <AuditReport title="Past Reports" reportId={selectedReportId} />
        <AuditReport title="Generate New Report" />
      </TabLayout>
    </div>
  );
}

export default App;
