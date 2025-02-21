import React, { useEffect, useState } from 'react';
import { fetchAuditDataByID, fetchReportList } from '../utils/api';
import '../styles/AuditReport.scss';
import AuditHeader from '../components/AuditHeader';
import ReportList from '../components/ReportList';
import ScoreSection from '../components/ScoreSection';
import Error from '../components/Error';
import { useAuth } from '../App';

export default function AuditReport() {
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [reportList, setReportList] = useState([]);
  const [error, setError] = useState(null);
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
        console.log(response);
        if (response) {
          setAuditData(response);
        }
      } catch (error) {
        console.error('Error fetching audit data:', error);
        setError(error);
      }
    };

    fetchData();
  }, [selectedReportId]);

  // **Show error page if an error occurs**
  if (error) {
    console.log('Error encountered:', error);
    return <Error />;
  }

  // **Show report list if no report is selected**
  if (!selectedReportId) {
    return (
      <ReportList reports={reportList} onSelectReport={setSelectedReportId} />
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'relative',
          top: '9px',
        }}
      >
        <button
          onClick={() =>
            document
              .getElementById('take_action')
              .scrollIntoView({ behavior: 'smooth' })
          }
        >
          Take Bulk Action ↓
        </button>
        <button onClick={() => setSelectedReportId(null)}>Go Back</button>
      </div>

      <p style={{ textAlign: 'right', fontSize: 'small' }}>
        Last Updated: {new Date().toLocaleString()}
      </p>
      <ScoreSection
        token={token}
        hub_domain={'hub_domain'}
        overall_audit_score={overall_audit_score}
        object_scores={object_scores}
        score_breakdown={score_breakdown}
        data_audit={data_audit}
      />
    </div>
  );
}
