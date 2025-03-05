import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.scss';
import TabLayout from './components/TabLayout';
import AuditReport from './pages/auditReport';
import GenerateReport from './pages/generateReport';
import { fetchUserData } from './utils/api';

// Create Auth Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function App() {
  const [activeTab, setActiveTab] = useState('current');
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedReportId(null);
  };

  const url = new URL(window.location.href);
  const urlToken = url.searchParams.get('state');

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    const authCookie = cookies.find((cookie) => cookie.startsWith('state='));
    return authCookie ? authCookie.split('=')[1] : null;
  };

  useEffect(() => {
    let savedToken = getTokenFromCookies();

    if (urlToken) {
      document.cookie = `state=${urlToken}; path=/; SameSite=Lax; Secure; max-age=${
        60 * 60 * 24
      }`;
      url.searchParams.delete('state');
      window.history.replaceState(null, '', url.toString());
      savedToken = urlToken;
    }

    if (savedToken) {
      setToken(savedToken);
      fetchUserData(savedToken).then((data) => {
        setUserData(data);
      });
    } else {
      window.location.href =
        'https://test-portal-contentninja-6343592.hs-sites.com/audit-app-login';
    }
  }, []);

  if (!token) {
    return null; // Prevent rendering until authenticated
  }

  return (
    <AuthContext.Provider value={{ token }}>
      <div className="cms-react-boilerplate__container min-h-screen bg-gray-50">
        <TabLayout
          sidebarContent={
            <div className="sidebar">
              {/* Tab Buttons */}
              <button
                onClick={() => {
                  handleTabChange('current');
                }}
                className={`sidebar-button ${
                  activeTab === 'current' ? 'active' : ''
                }`}
              >
                Your Report
              </button>
              <button
                onClick={() => {
                  handleTabChange('past');
                }}
                className={`sidebar-button ${
                  activeTab === 'past' ? 'active' : ''
                }`}
              >
                Past Reports
              </button>
            </div>
          }
          setSelectedReportId={setSelectedReportId}
        >
          {/* Main Content */}
          <GenerateReport title="Your Report" userData={userData} />
          <AuditReport
            title="Past Reports"
            userData={userData}
            selectedReportId={selectedReportId}
            setSelectedReportId={setSelectedReportId}
          />
        </TabLayout>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
