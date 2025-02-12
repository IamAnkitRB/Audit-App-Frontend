export const fetchAuditDataByID = async (token, reportId) => {
  try {
    const response = await fetch(
      'https://tapir-relaxing-partly.ngrok-free.app/fetchreport',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
        body: JSON.stringify({ reportId: reportId }),
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Get report data:::', data);
    return data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};

export const fetchReportList = async (token) => {
  try {
    const response = await fetch(
      'https://tapir-relaxing-partly.ngrok-free.app/pastreports',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: `${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching report list:', error);
    throw error;
  }
};

export const triggerCheckReport = async (token) => {
  try {
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
    return data;
  } catch (error) {
    console.error('Error while triggering check report:', error);
    throw error;
  }
};

export const triggerReportGeneration = async (token) => {
  try {
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
    return data;
  } catch (error) {
    console.error('Error while triggering report genearation:', error);
    throw error;
  }
};

export const fetchGraphData = async (
  token,
  reportId,
  objectType,
  dataPoint,
) => {
  try {
    const response = await fetch(
      'https://deep-socially-polliwog.ngrok-free.app/get_graph_data',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
        body: JSON.stringify({ reportId, objectType, dataPoint }),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching graph data:`, error);
    throw error;
  }
};
