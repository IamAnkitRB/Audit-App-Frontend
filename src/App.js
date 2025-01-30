import React, { useState, useEffect } from 'react';
import './App.scss';
import TabLayout from './components/TabLayout';
import Header from './components/Header';
import AuditReport from './pages/auditReport';
import GenerateReport from './pages/generateReport';

function App() {
  const [activeTab, setActiveTab] = useState('current');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const url = new URL(window.location.href);
  const token = url.searchParams.get("state");

  const checkAuth = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    return cookies.some(cookie => cookie.startsWith('state='));
  };

  useEffect(() => {
    if (token) {
      document.cookie = `state=${token}; path=/; SameSite=Lax; Secure; max-age=${60 * 60 * 24}`;
      url.searchParams.delete("state");
      window.history.replaceState(null, "", url.toString());
    }
    if (checkAuth()) {
      setIsAuthenticated(true);
    } else {
      window.location.href = 'https://test-portal-contentninja-6343592.hs-sites.com/audit-app-login';
    }
  }, []);

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

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
        <AuditReport title="Past Reports" />
      </TabLayout>
    </div>
  );
}

export default App;
