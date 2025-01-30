import React, { useState, useEffect } from "react";
import "../styles/GenerateReport.scss";
import "../styles/AuditReport.scss";
import AuditHeader from "../components/AuditHeader";
import ReportGenerate from "../components/ReportGenerating";
import ScoreSection from "../components/ScoreSection";

const GenerateReport = () => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [reportData, setReportData] = useState(null);
    const [token, setToken] = useState(null);
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
    };

    const { overallScore, globalAverage, industryAverage, dataAudit } = auditData;

    const checkReport = async () => {
        try {
            const response = await fetch("https://tapir-relaxing-partly.ngrok-free.app/checkreport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ state: token }),
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
            setError("Something went wrong! Please try again later.");
            console.log("Error occurred:", err);
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
                body: JSON.stringify({ state: token }),
            });

            const data = await response.json();
            if (data.success) {
                if (data?.report_details?.status === "completed") {
                    setIsGenerating(false);
                }
                console.log(data);
            } else {
                throw new Error(data.message || "Failed to generate the report.");
            }
        } catch (err) {
            setError(err.message);
            console.log("Some error", err);
        }
    };

    useEffect(() => {
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
        const stateCookie = cookies.find((cookie) => cookie.startsWith("state="));

        if (stateCookie) {
            const stateValue = stateCookie.split("=")[1];
            setToken(stateValue);
            checkReport();
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
                    <p>There seems to be some problem at this moment! Please try again later.</p>
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
