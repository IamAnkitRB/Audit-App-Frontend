export const fetchAuditDataByID = async (token, reportId) => {
  try {
    const response = await fetch('https://hsaudit.boundaryhq.com/fetchreport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        state: token,
      },
      body: JSON.stringify({ reportId: reportId }),
    });

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
    const response = await fetch('https://hsaudit.boundaryhq.com/pastreports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        state: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return data;
  } catch (error) {
    console.error('Error fetching report list:', error);
    throw error;
  }
};

export const triggerCheckReport = async (token, hubID) => {
  try {
    const response = await fetch('https://hsaudit.boundaryhq.com/checkreport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        state: token,
      },
      body: JSON.stringify({ hub_id: hubID }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while triggering check report:', error);
    throw error;
  }
};

export const triggerReportGeneration = async (token, hubID) => {
  try {
    const response = await fetch('https://hsaudit.boundaryhq.com/getreport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        state: token,
      },
      body: JSON.stringify({ hub_id: hubID }),
    });

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
      'https://hsaudit.boundaryhq.com/checkandfetchgraph',
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
    const response = await fetch('https://hsaudit.boundaryhq.com/gethubinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        state: token,
      },
    });

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
      'https://hsaudit.boundaryhq.com/generatenewreport',
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
      'https://hsaudit.boundaryhq.com/addnewaccount',
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
    const response = await fetch('https://hsaudit.boundaryhq.com/savegraphs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        state: token,
      },
      body: JSON.stringify({ report_id: reportId, hub_id: hubId }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(`Error while adding new hubspot porta:`, error);
    throw error;
  }
};
