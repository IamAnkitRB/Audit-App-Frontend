import React from 'react';
import '../styles/DataTable.scss';

const DataTable = ({ data, headers, keys }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {keys.map((key, keyIndex) => (
              <td key={keyIndex}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
