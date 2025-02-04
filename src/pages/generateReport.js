import React, { useState, useEffect } from 'react';
import '../styles/GenerateReport.scss';
import '../styles/AuditReport.scss';
import AuditHeader from '../components/AuditHeader';
import ReportGenerate from '../components/ReportGenerating';
import ScoreSection from '../components/ScoreSection';
import { fetchAuditDataByID } from '../utils/api';

const GenerateReport = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  // const [auditData, setAuditData] = useState(null)

  const auditData = {
    status: 'success',
    data: {
      overall_audit_score: {
        score: 53,
        global_average_difference: -13,
        industry_average_difference: -6,
      },
      score_breakdown: {
        data_quality: {
          score: 94,
          global_benchmark: 68,
        },
        marketing: {
          score: 23,
          global_benchmark: 45,
        },
        sales: {
          score: 67,
          global_benchmark: 79,
        },
        service: {
          score: null,
          global_benchmark: 85,
          status: 'Not in Use',
        },
      },
      data_audit: {
        contacts: {
          score: 91,
          status: 'poor',
          missing_data: {
            without_first_name: 80,
            without_email: 65,
            without_associated_company: 25,
            without_owner: 4,
            without_deals: 73,
            without_lead_source: 73,
            without_lifecycle_stage: 23,
            without_lead_status: 36,
            without_job_title: 23,
            without_marketing_contact_status: 58,
            without_lead_score: 36,
            without_phone: 58,
          },
          junk_data: {
            no_activity_in_last_180_days: 1362,
            internal_team_members: 19,
          },
        },
        companies: {
          score: 23,
          status: 'poor',
          missing_data: {
            without_name: 58,
            without_domain: 58,
            without_associated_contacts: 62,
            without_owner: 4,
            without_deals: 43,
            without_lead_source: 32,
            without_lifecycle_stage: 23,
            without_region: 21,
            without_employee_count: 48,
            without_revenue: 73,
            without_linkedin: 20,
            without_phone: 36,
          },
          junk_data: {
            no_activity_in_last_180_days: 230,
            internal_team_members: 230,
          },
        },
        deals: {
          score: 67,
          status: 'good',
          missing_data: {
            without_name: 40,
            without_owner: 58,
            without_associated_contacts: 45,
            without_associated_company: 31,
            without_close_date: 58,
            without_amount: 23,
            without_lost_reason: 23,
            without_stage: 36,
            without_type: 55,
          },
          junk_data: {
            no_activity_in_last_180_days: 32,
            internal_team_members: 230,
          },
        },
        tickets: {
          score: 54,
          status: 'medium',
          missing_data: {
            without_name: 40,
            without_owner: 15,
            without_associated_contacts: 31,
            without_associated_company: 31,
            without_priority: 30,
            without_description: 42,
            without_pipeline: 42,
            without_status: 40,
          },
          junk_data: {
            no_activity_in_last_180_days: 16,
            internal_team_members: 230,
          },
        },
      },
    },
  };

  const { overall_audit_score, score_breakdown, data_audit } = auditData.data;

  const checkReport = async () => {
    try {
      if (token) {
        const response = await fetch(
          'https://tapir-relaxing-partly.ngrok-free.app/checkreport',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ state: token }),
          },
        );
        const data = await response.json();
        if (data.success) {
          if (
            !data.generate_report &&
            data.report_details.status === 'In Progress'
          ) {
            setTimeout(checkReport, 5000);
            setReportData({
              reportId: data.report_details.report_id,
              status: data.report_details.status,
              reportDate: new Date().toLocaleDateString(),
            });
          } else if (!data.generate_report && data.report_details) {
            setReportData({
              reportId: data.report_details.report_id,
              status: data.report_details.status,
              reportDate: new Date().toLocaleDateString(),
            });
            const response = await fetchAuditDataByID(token, data.report_details.report_id)
            // setAuditData(response.data);
            setIsGenerating(false);
          } else if (data.generate_report) {
            setTimeout(checkReport, 5000);
            await generateNewReport();
          }
        } else {
          throw new Error('Failed to check report status.');
        }
      }
    } catch (err) {
      setError('Something went wrong! Please try again later.');
      console.log('Error occurred:', err);
      setIsGenerating(false);
    }
  };

  const generateNewReport = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch(
        'https://tapir-relaxing-partly.ngrok-free.app/getreport',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state: token }),
        },
      );

      const data = await response.json();
      if (data.success) {
        if (data?.report_details?.status === 'completed') {
          setIsGenerating(false);
        }
        console.log(data);
      } else {
        throw new Error(data.message || 'Failed to generate the report.');
      }
      return data;
    } catch (err) {
      setError(err.message);
      console.log('Some error', err);
    }
  };

  useEffect(() => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    const stateCookie = cookies.find((cookie) => cookie.startsWith('state='));

    if (stateCookie) {
      const stateValue = stateCookie.split('=')[1];
      setToken(stateValue);
      if (stateValue !== null) {
        console.log('making request with statevalue::', stateValue);
        setToken(stateValue);
        checkReport();
      }
    } else {
      setIsGenerating(false);
    }
  }, [token]);

  // **Show only error page if an error occurs**
  if (false) {
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

  return (
    <div className="generate-report-container">
      <AuditHeader />
      {isGenerating ? (
        <ReportGenerate reportData={reportData} />
      ) : (
        <div className="report-ready">
          <ScoreSection overall_audit_score={overall_audit_score} score_breakdown={score_breakdown}  data_audit={data_audit} />
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
