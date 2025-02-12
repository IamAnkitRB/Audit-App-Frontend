import React, { useState, useEffect } from 'react';
import '../styles/GenerateReport.scss';
import '../styles/AuditReport.scss';
import AuditHeader from '../components/AuditHeader';
import ReportGenerate from '../components/ReportGenerating';
import ScoreSection from '../components/ScoreSection';
import { fetchUserData } from '../utils/api';
import {
  fetchAuditDataByID,
  triggerCheckReport,
  triggerReportGeneration,
} from '../utils/api';

const GenerateReport = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [userData, setUserData] = useState(null);

  const checkReport = async () => {
    try {
      if (token) {
        const data = await triggerCheckReport(token);
        if (data.success) {
          if (
            !data.generate_report &&
            (data.report_details.status === 'Pending' ||
              data.report_details.status === 'In Progress')
          ) {
            setIsGenerating(true);
            setTimeout(checkReport, 10000);
          } else if (
            !data.generate_report &&
            data?.report_details?.status == 'Completed'
          ) {
            const response = await fetchAuditDataByID(
              token,
              data.report_details.report_id,
            );
            setAuditData(response.data);
            setIsGenerating(false);
          } else if (data.generate_report) {
            setIsGenerating(true);
            setTimeout(checkReport, 10000);
            await generateNewReport();
          }
        } else {
          throw new Error('Failed to check report status.');
        }
      }
    } catch (err) {
      setError('Something went wrong! Please try again later.');
      console.log('Error occurred:', err);
    }
  };

  const generateNewReport = async () => {
    try {
      setIsGenerating(true);
      const data = await triggerReportGeneration(token);
      if (data.success && data?.report_details?.status === 'completed') {
        setIsGenerating(false);
      } else {
        throw new Error(data.message || 'Failed to generate the report.');
      }
      return data;
    } catch (err) {
      setError(err.message);
      console.log('Some error', err);
    }
  };

  useEffect(async () => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    const stateCookie = cookies.find((cookie) => cookie.startsWith('state='));

    if (stateCookie) {
      const stateValue = stateCookie.split('=')[1];
      setToken(stateValue);
      if (stateValue !== null) {
        setToken(stateValue);
        const result = await fetchUserData(token);
        setUserData(result);
        checkReport();
      }
    } else {
      setIsGenerating(false);
    }
  }, [token]);

  // **Show only error page if an error occurs**
  if (error) {
    return (
      <div className="error-page">
        <div className="error-box">
          <h1>⚠️ Oops! Something Went Wrong</h1>
          <p>
            There seems to be some problem at this moment! Please try again
            later.
          </p>
          <button onClick={() => window.location.reload()}>🔄 Try Again</button>
        </div>
      </div>
    );
  }

  const overall_audit_score = auditData?.data?.overall_audit_score || null;
  const score_breakdown = auditData?.data?.score_breakdown || null;
  const data_audit = auditData?.data?.data_audit || null;

  return (
    <div className="generate-report-container">
      <AuditHeader
        userData={{
          hub_details: {
            hs_user: 'Ankit',
            hs_user_email: 'ankit@boundary.agency',
            hub_domain:
              'hubspot-demo-ritu.hubspot-demo-account.contentninja.in',
            hub_id: 40047290,
          },
          session_id: 97,
          unique_hub_ids: [
            {
              hub_domain: 'hubspot-demo-account.contentninja.in',
              hub_id: 6343592,
            },
            {
              hub_domain:
                'hubspot-demo-ritu.hubspot-demo-account.contentninja.in',
              hub_id: 40047290,
            },
          ],
        }}
      />
      {isGenerating ? (
        <ReportGenerate />
      ) : (
        <div className="report-ready">
          {overall_audit_score &&
            score_breakdown &&
            data_audit &
            (
              <ScoreSection
                token={token}
                overall_audit_score={overall_audit_score}
                score_breakdown={score_breakdown}
                data_audit={data_audit}
              />
            )}
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
