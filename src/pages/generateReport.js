import React, { useState, useEffect } from "react";
import "../styles/GenerateReport.scss";
import '../styles/AuditReport.scss';
import AuditHeader from "../components/AuditHeader";
import ReportGenerate from "../components/ReportGenerating";


const GenerateReport = () => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState(null);

    const auditData = {
        id: '001',
        createDate: '08-Jan-2025',
        overallScore: 70,
        globalAverage: 66,
        industryAverage: 60,
        scores: {
            dateAudit: 40,
            salesAudit: 75,
            marketingAudit: 68,
            serviceAudit: 72,
            roiAudit: 65,
        },
        benchmarks: 70,
        dataAudit: {
            contacts: 60,
            companies: 30,
            deals: 75,
            tickets: 40,
        },
    }

    const { overallScore, globalAverage, industryAverage, dataAudit } = auditData;

    const url = new URL(window.location.href);
    const token = url.searchParams.get("state");

    const checkReport = async () => {
        try {
            const response = await fetch("https://tapir-relaxing-partly.ngrok-free.app/checkreport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ state: token })
            });
            const data = await response.json();

            if (data.success) {
                if (!data.generate_report && data.report_details.status === "In Progress") {
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
                    setIsGenerating(false);
                } else if (data.generate_report) {
                    setTimeout(checkReport, 5000);
                    await generateNewReport();
                }
            } else {
                throw new Error("Failed to check report status.");
            }
        } catch (err) {
            setError("Failed to check report. Please try again later.");
            console.log('error occured', err)
            setIsGenerating(false);
        }
    };

    const generateNewReport = async () => {
        try {
            setIsGenerating(true);
            const response = await fetch("https://tapir-relaxing-partly.ngrok-free.app/getreport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ state: token })
            });

            const data = await response.json();
            if (data.success) {
                if (data?.report_details?.status == 'completed') {
                    setIsGenerating(false);
                }
                console.log('data::', JSON.stringify(data))

            } else {
                throw new Error(data.message || "Failed to generate the report.");
            }
        } catch (err) {
            setError(err.message);
            console.log('Some error', err)
        }
    };

    useEffect(() => {
        if (token) {
            checkReport();
        }
    }, []);

    return (
        <div className="generate-report-container">
            <AuditHeader />
            {isGenerating ? (
                <ReportGenerate reportData={reportData}/>
            ) : (
                <div className="report-ready">
                    <ScoreSection
                        overallScore={overallScore}
                        globalAverage={globalAverage}
                        industryAverage={industryAverage}
                        auditData={auditData}
                        dataAudit={dataAudit}
                    />
                </div>
            )}
        </div>
    );
};

export default GenerateReport;