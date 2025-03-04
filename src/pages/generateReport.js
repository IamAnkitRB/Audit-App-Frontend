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
  triggerGraphGeneration,
  fetchGraphData,
} from '../utils/api';
import { useAuth } from '../App';

const GenerateReport = ({ userData }) => {
  const { token } = useAuth();

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingGraph, setIsGeneratingGraph] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [hubId, setHubId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [reportId, setReportId] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const checkReport = async (hubId, token) => {
    try {
      if (!token || !hubId) {
        console.error('Token or Hub ID is missing');
        return;
      }

      const data = await triggerCheckReport(token, hubId);

      if (!data.success) {
        throw new Error('Failed to check report status.');
      }

      let timeout = null;

      if (
        !data.generate_report &&
        (data?.report_details?.status === 'Pending' ||
          data?.report_details?.status === 'In Progress')
      ) {
        setIsGenerating(true);
        setProgress(data?.report_details?.progress);
        setTimeout(checkReport, 10000, hubId, token);
      } else if (
        !data.generate_report &&
        data?.report_details?.status === 'Completed'
      ) {
        const response = await fetchAuditDataByID(
          token,
          data.report_details.report_id,
        );
        setReportId(data.report_details.report_id);
        setAuditData(response?.result);
        setLastUpdated(response?.updated_at);
        setProgress(100);
        setIsGenerating(false);
        fetchGraphStatus(data.report_details.report_id);
      } else if (data.generate_report) {
        setIsGenerating(true);
        setProgress(2);
        setTimeout(checkReport, 10000, hubId, token);
        await generateNewReport(hubId, timeout);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Something went wrong! Please try again later.');
      console.error('Error occurred:', err);
    }
  };

  const generateNewReport = async (hubId, timeout) => {
    try {
      if (!token || !hubId) {
        throw new Error('Token or Hub ID is missing');
      }

      console.log('Generating new report for hub:', hubId);
      setIsGenerating(true);

      const data = await triggerReportGeneration(token, hubId);

      if (data.success) {
        setIsGenerating(false);
        await triggerGraphGeneration(token, data.report_id, hubId);

        fetchGraphStatus(data.report_id);
      } else {
        throw new Error(data.message || 'Failed to generate the report.');
      }

      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error generating report:', err);
    }
  };

  const fetchGraphStatus = async (reportId) => {
    try {
      if (!token || !reportId) {
        throw new Error('Token or Report ID is missing');
      }

      let result = await fetchGraphData(token, reportId);

      if (result?.success) {
        setGraphData(result?.data);
        if (result?.status === 'Completed') {
          setIsGeneratingGraph(false);
        }
      }

      while (result?.status !== 'Completed' && !isGenerating) {
        console.log('Graph is not completed. Retrying...');

        await new Promise((resolve) => setTimeout(resolve, 60000));

        result = await fetchGraphData(token, reportId);
        if (result?.success) {
          setGraphData(result?.data);
          if (result?.status === 'Completed') {
            setIsGeneratingGraph(false);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching graph status:', err);
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

        setHubId(result.hub_details.hub_id);
        checkReport(result.hub_details.hub_id, token);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      }
    };

    fetchUserDetails();
  }, [token]);

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
        hubId={hubId}
        setHubId={setHubId}
        setAuditData={setAuditData}
        setReportId={setReportId}
        setGraphData={setGraphData}
        setIsGeneratingGraph={setIsGeneratingGraph}
        isGeneratingGraph={isGeneratingGraph}
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
                  marginBottom: '1rem',
                }}
              >
                Last Updated: {lastUpdated}
              </p>
              <ScoreSection
                token={token}
                overall_audit_score={overall_audit_score}
                object_scores={object_scores}
                score_breakdown={score_breakdown}
                data_audit={data_audit}
                graphData={graphData}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
