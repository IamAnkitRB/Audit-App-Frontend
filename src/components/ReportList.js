import React, { useState } from 'react';

const ReportList = ({ reports, onSelectReport, setSelectedHub }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  // Get reports for current page
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  // Change page
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="audit-report">
      <h3 className="audit-report__title">Past Reports</h3>
      {/* Pagination Controls */}
      <div className="pagination">
        <p onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </p>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <p onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </p>
      </div>
      <table className="audit-report__table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Hub Domain</th>
            <th>Create Date</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentReports.map((report) => (
            <tr key={report.report_id}>
              <td>{report.report_id}</td>
              <td>{report.hub_domain}</td>
              <td>{new Date(report.created_at).toLocaleDateString()}</td>
              <td>{report.score ? report.score : 'N/A'}</td>
              <td>
                <button
                  onClick={() => {
                    onSelectReport(report.report_id);
                    setSelectedHub(report.hub_domain);
                  }}
                >
                  View Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
