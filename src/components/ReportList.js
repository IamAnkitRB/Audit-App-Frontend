import React from 'react';

const ReportList = ({ reports, onSelectReport }) => (
  <div className="audit-report">
    <h3 className="audit-report__title">Past Reports</h3>
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
        {reports.map((report) => (
          <tr key={report.report_id}>
            <td>{report.report_id}</td>
            <td>{report.hub_domain}</td>
            <td>{new Date(report.created_at).toLocaleDateString()}</td>
            <td>{report.score ? report.score : 'N/A'}</td>
            <td>
              <button onClick={() => onSelectReport(report.report_id)}>
                View Report
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReportList;
