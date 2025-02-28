export const fetchAuditDataByID = async (token, reportId) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/fetchreport',
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

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};

export const fetchReportList = async (token) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/pastreports',
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

export const triggerCheckReport = async (token, hubID) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/checkreport',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
        body: JSON.stringify({ hub_id: hubID }),
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while triggering check report:', error);
    throw error;
  }
};

export const triggerReportGeneration = async (token, hubID) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/getreport',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
        body: JSON.stringify({ hub_id: hubID }),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while triggering report genearation:', error);
    throw error;
  }
};

export const fetchGraphData = async (token, reportId) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/checkandfetchgraph',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
        body: JSON.stringify({
          report_id: reportId,
        }),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching graph data:`, error);
    throw error;
  }
};

export const fetchUserData = async (token) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/gethubinfo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error while fetching user data:`, error);
    throw error;
  }
};

export const generateNewReport = async (token, hubId) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/generatenewreport',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
        body: JSON.stringify({ hub_id: hubId }),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error while fetching user data:`, error);
    throw error;
  }
};

export const addNewAccount = async (token) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/addnewaccount',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(`Error while adding new hubspot porta:`, error);
    throw error;
  }
};

export const triggerGraphGeneration = async (token, reportId, hubId) => {
  try {
    const response = await fetch(
      'https://enabling-condor-instantly.ngrok-free.app/savegraphs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          state: token,
        },
        body: JSON.stringify({ report_id: reportId, hub_id: hubId }),
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(`Error while adding new hubspot porta:`, error);
    throw error;
  }
};
