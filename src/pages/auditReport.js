import React, { useEffect, useState } from 'react';
import { fetchAuditData } from '../utils/api';
import '../styles/AuditReport.scss';
import AuditHeader from '../components/AuditHeader';
import ReportList from '../components/ReportList';
import ScoreSection from '../components/ScoreSection';
import { fetchReportList } from '../utils/api';

export default function AuditReport({ reportIdArray }) {
  const [selectedReportId, setSelectedReportId] = useState(null); 
  const [auditData, setAuditData] = useState(null);
  const [reportList, setReportList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (selectedReportId) {
        const response = await fetchAuditData(selectedReportId);
        setAuditData(response);
      }
    };
    fetchData();
  }, [selectedReportId]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const cookies = document.cookie.split("; ");
        const stateCookie = cookies.find((cookie) => cookie.startsWith("state="));
        const stateToken = stateCookie ? stateCookie.split("=")[1] : null;

        const response = await fetchReportList(stateToken); 
        setReportList(response.data || []); 
      } catch (error) {
        console.error("Error fetching report list:", error);
      }
    };
    fetchReports();
  }, []);

  if (!selectedReportId) {
    return <ReportList reports={reportList} onSelectReport={setSelectedReportId} />;
  }

  if (!auditData) {
    return <div>Loading report data...</div>;
  }

  const { overallScore, globalAverage, industryAverage, dataAudit } = auditData;

  return (
    <div className="audit-report">
       <AuditHeader onBackClick={() => setSelectedReportId(null)} showBackButton />

      {/* Overall Audit Score */}
      <ScoreSection
        overallScore={overallScore}
        globalAverage={globalAverage}
        industryAverage={industryAverage}
        auditData = {auditData}
        dataAudit={dataAudit}
      />
      
    </div>
  );
}
