export const fetchAuditDataByID = async (state, reportId) => {
  try {
    const response = await fetch(
      'https://tapir-relaxing-partly.ngrok-free.app/fetchreport',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: state,
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

export const fetchReportList = async (state) => {
  try {
    const response = await fetch(
      'https://tapir-relaxing-partly.ngrok-free.app/pastreports',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: `${state}`,
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
