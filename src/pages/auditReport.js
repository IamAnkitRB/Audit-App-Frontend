import React, { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { fetchAuditData } from '../utils/api';
import '../styles/AuditReport.scss';
import ReportDetails from '../components/ReportDetails';
import AuditHeader from '../components/AuditHeader';
import ReportList from '../components/ReportList';
import ScoreSection from '../components/ScoreSection';

export default function AuditReport({ reportIdArray }) {
  const [selectedReportId, setSelectedReportId] = useState(null); 
  const [auditData, setAuditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedReportId) {
        const response = await fetchAuditData(selectedReportId);
        setAuditData(response);
      }
    };
    fetchData();
  }, [selectedReportId]);

  if (!selectedReportId) {
    return <ReportList reports={reportIdArray} onSelectReport={setSelectedReportId} />;
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
