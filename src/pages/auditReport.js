import React, { useEffect, useState } from 'react';
import {
  fetchAuditDataByID,
  fetchReportList,
  fetchGraphData,
} from '../utils/api';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import '../styles/AuditReport.scss';
import ReportList from '../components/ReportList';
import ScoreSection from '../components/ScoreSection';
import Error from '../components/Error';
import { useAuth } from '../App';

export default function AuditReport({
  userData,
  selectedReportId,
  setSelectedReportId,
}) {
  const [selectedHub, setSelectedHub] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [reportList, setReportList] = useState([]);
  const [error, setError] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { token } = useAuth();

  // Fetch Report List
  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (!token) return;

        const response = await fetchReportList(token);

        if (response?.data && response.data.length > 0) {
          setReportList(response.data);
        }
      } catch (error) {
        console.error('Error fetching report list:', error);
        setError(error);
      }
    };

    fetchReports();
  }, [token]);

  // Fetch Selected Report Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !selectedReportId) return;

        const response = await fetchAuditDataByID(token, selectedReportId);
        if (response) {
          setAuditData(response?.result);
          setLastUpdated(response?.updated_at);
        }
        fetchGraphStatus(selectedReportId);
      } catch (error) {
        console.error('Error fetching audit data:', error);
        setError(error);
      }
    };

    fetchData();
  }, [selectedReportId]);

  const handleLogout = () => {
    document.cookie = 'state=; Max-Age=0; path=/;';
    window.location.href =
      'https://test-portal-contentninja-6343592.hs-sites.com/audit-app-login';
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const fetchGraphStatus = async (reportId) => {
    try {
      if (!token || !reportId) {
        throw new Error('Token or Report ID is missing');
      }

      let result = await fetchGraphData(token, reportId);

      if (result?.success) {
        setGraphData(result?.data);
      }
    } catch (err) {
      console.error('Error fetching graph status:', err);
    }
  };

  // **Show error page if an error occurs**
  if (error) {
    console.log('Error encountered:', error);
    return <Error />;
  }

  // **Show report list if no report is selected**
  if (!selectedReportId) {
    return (
      <ReportList
        reports={reportList}
        onSelectReport={setSelectedReportId}
        setSelectedHub={setSelectedHub}
      />
    );
  }

  // **Show loading while fetching data**
  if (!auditData) {
    return <div>Loading report data...</div>;
  }

  const { overall_audit_score, score_breakdown, object_scores, data_audit } =
    auditData;

  return (
    <div className="audit-report">
      <header className="audit-report__header">
        <div className="report-header">
          <div>
            <p>Hi {userData?.hub_details?.data?.hs_user}</p>
            <div className="dropdown" style={{ marginTop: '6px' }}>
              <div className="dropdown-domain">{selectedHub}</div>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            {/* <button
              onClick={() =>
                document
                  .getElementById('take_action')
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              Take Bulk Action ↓
            </button> */}
            <div className="header__user">
              <div
                className="header__user-icon"
                onClick={toggleDropdown}
                style={{ cursor: 'pointer' }}
              >
                <UserCircleIcon className="header__user-heroicon" />
              </div>
              {isDropdownOpen && (
                <div className="header__dropdown">
                  <p
                    className="header__dropdown-button"
                    onClick={handleLogout}
                    style={{
                      opacity: 1,
                      cursor: 'pointer',
                      fontSize: 'medium',
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'small',
        }}
      >
        <p
          style={{ cursor: 'pointer' }}
          onClick={() => setSelectedReportId(null)}
        >
          ← Go Back
        </p>

        <p style={{ marginTop: 0 }}>Last Updated: {lastUpdated}</p>
      </div>

      <ScoreSection
        token={token}
        overall_audit_score={overall_audit_score}
        object_scores={object_scores}
        score_breakdown={score_breakdown}
        data_audit={data_audit}
        graphData={graphData}
        page="past"
      />
    </div>
  );
}
