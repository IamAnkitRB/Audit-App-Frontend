import React, { useState, useEffect } from 'react';
import '../styles/GenerateReport.scss';
import '../styles/AuditReport.scss';
import AuditHeader from '../components/AuditHeader';
import ReportGenerate from '../components/ReportGenerating';
import ScoreSection from '../components/ScoreSection';
import Error from '../components/Error';
import {
  fetchUserData,
  fetchAuditDataByID,
  triggerCheckReport,
  triggerReportGeneration,
} from '../utils/api';
import { useAuth } from '../App';

const GenerateReport = () => {
  const { token } = useAuth();

  const [isGenerating, setIsGenerating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [hubId, setHubId] = useState(null);
  const [progress, setProgress] = useState(0);

  const checkReport = async (hubId) => {
    try {
      if (!token || !hubId) {
        console.error('Token or Hub ID is missing');
        return;
      }

      const data = await triggerCheckReport(token, hubId);

      if (!data.success) {
        setIsLoading(false);
        throw new Error('Failed to check report status.');
      }

      if (
        !data.generate_report &&
        (data?.report_details?.status === 'Pending' ||
          data?.report_details?.status === 'In Progress')
      ) {
        setIsLoading(false);
        setIsGenerating(true);
        setProgress(data?.report_details?.progress);
        setTimeout(checkReport, 10000, hubId);
      } else if (
        !data.generate_report &&
        data?.report_details?.status === 'Completed'
      ) {
        const response = await fetchAuditDataByID(
          token,
          data.report_details.report_id,
        );
        setIsLoading(false);
        setAuditData(response);
        setProgress(100);
        setIsGenerating(false);
      } else if (data.generate_report) {
        setIsLoading(false);
        setIsGenerating(true);
        setProgress(0);
        setTimeout(checkReport, 10000, hubId);
        await generateNewReport();
      }
    } catch (err) {
      setError('Something went wrong! Please try again later.');
      console.error('Error occurred:', err);
    }
  };

  const generateNewReport = async () => {
    try {
      if (!token || !hubId) {
        throw new Error('Token or Hub ID is missing');
      }

      console.log('Generating new report for hub:', hubId);
      setIsGenerating(true);

      const data = await triggerReportGeneration(token, hubId);

      if (data.success && data?.report_details?.status === 'completed') {
        setIsGenerating(false);
      } else {
        throw new Error(data.message || 'Failed to generate the report.');
      }

      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error generating report:', err);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!token) return;

        const result = await fetchUserData(token);

        if (!result || !result.hub_details) {
          throw new Error('Failed to fetch user data');
        }

        setUserData(result);
        setHubId(result.hub_details.hub_id); // Dynamically set hub ID

        checkReport(result.hub_details.hub_id);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      }
    };

    fetchUserDetails();
  }, [token]); // Runs when token changes

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        Loading...
      </div>
    );
  }

  const overall_audit_score = auditData?.overall_audit_score || null;
  const score_breakdown = auditData?.score_breakdown || null;
  const data_audit = auditData?.data_audit || null;
  const object_scores = auditData?.object_scores || null;

  return (
    <div className="generate-report-container">
      <AuditHeader
        userData={userData}
        token={token}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
        checkReport={checkReport}
        setProgress={setProgress}
        setHubId={setHubId}
      />
      {isGenerating ? (
        <ReportGenerate progress={progress} />
      ) : (
        <div className="report-ready">
          {overall_audit_score && score_breakdown && data_audit && (
            <>
              <p
                style={{
                  position: 'relative',
                  fontSize: 'small',
                  textAlign: 'right',
                  margin: 0,
                }}
              >
                Last Updated: {new Date().toLocaleString()}
              </p>
              <ScoreSection
                token={token}
                overall_audit_score={overall_audit_score}
                object_scores={object_scores}
                score_breakdown={score_breakdown}
                data_audit={data_audit}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
