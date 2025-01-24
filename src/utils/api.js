export const fetchContactsData = async () => {
  return {
    totalContacts: 1200,
    missingData: [
      { property: 'Email', count: 300, percentage: '25%' },
      { property: 'Phone Number', count: 450, percentage: '37.5%' },
      { property: 'Owner', count: 450, percentage: '37.5%' },
    ],
    lifecycleData: {
      labels: [
        'Subscriber',
        'Lead',
        'Marketing Qualified Lead',
        'Sales Qualified Lead',
        'Customer',
        'Evangelist',
      ],
      data: [300, 200, 150, 100, 50, 10],
    },
  };
};

export const fetchCompaniesData = async () => {
  return {
    totalCompanies: 100,
    missingData: [
      { property: 'No Associated Contact', count: 25, percentage: '25%' },
      { property: 'No Domain', count: 40, percentage: '40%' },
      { property: 'No Lifecycle Stage', count: 35, percentage: '35%' },
    ],
    lifecycleData: {
      labels: ['Prospect', 'Customer', 'Inactive'],
      data: [50, 30, 20],
    },
  };
};

export const fetchDealsData = async () => {
  return {
    totalDeals: 1295,
    dealPipelines: [
      {
        dealOwner: 'Yavanika Sharma',
        totalDeals: 10,
        dealsWon: 3,
        winRate: '30%',
      },
      {
        dealOwner: 'Pranav Pandhi',
        totalDeals: 5,
        dealsWon: 2,
        winRate: '40%',
      },
      {
        dealOwner: 'Madhur Sharma',
        totalDeals: 15,
        dealsWon: 8,
        winRate: '53.33%',
      },
      { dealOwner: 'Unknown', totalDeals: 20, dealsWon: 5, winRate: '25%' },
      {
        dealOwner: 'Apoorv Singh',
        totalDeals: 300,
        dealsWon: 200,
        winRate: '66.67%',
      },
      {
        dealOwner: 'Yavanika Sharma',
        totalDeals: 60,
        dealsWon: 40,
        winRate: '66.67%',
      },
      {
        dealOwner: 'Shriya Garg',
        totalDeals: 250,
        dealsWon: 180,
        winRate: '72%',
      },
      {
        dealOwner: 'Mayank Gulati',
        totalDeals: 320,
        dealsWon: 260,
        winRate: '81.25%',
      },
      { dealOwner: 'Paul Joshy', totalDeals: 10, dealsWon: 3, winRate: '30%' },
      {
        dealOwner: 'Vaishnavi Gupta',
        totalDeals: 20,
        dealsWon: 5,
        winRate: '25%',
      },
      {
        dealOwner: 'Shagun Tyagi',
        totalDeals: 15,
        dealsWon: 5,
        winRate: '33.33%',
      },
      {
        dealOwner: 'Tushar Mittal',
        totalDeals: 150,
        dealsWon: 100,
        winRate: '66.67%',
      },
      {
        dealOwner: 'Madhur Sharma',
        totalDeals: 120,
        dealsWon: 60,
        winRate: '50%',
      },
    ],
  };
};

export const fetchTicketsData = async () => {
  return {
    totalTickets: 350,
    ticketStatusData: [
      { status: 'Open', count: 150 },
      { status: 'In Progress', count: 100 },
      { status: 'Closed', count: 80 },
      { status: 'Escalated', count: 20 },
    ],
    ticketOwners: [
      {
        ticketOwner: 'Apoorv Singh',
        totalTickets: 120,
        resolved: 100,
        resolutionRate: '83.33%',
      },
      {
        ticketOwner: 'Shriya Garg',
        totalTickets: 80,
        resolved: 70,
        resolutionRate: '87.5%',
      },
    ],
  };
};

export const fetchAuditData = async (reportId) => {
  const reports = {
    '21': {
      id: '21',
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
    },
    '002': {
      id: '002',
      createDate: '15-Jan-2025',
      overallScore: 65,
      globalAverage: 66,
      industryAverage: 62,
      scores: {
        dateAudit: 35,
        salesAudit: 60,
        marketingAudit: 70,
        serviceAudit: 65,
        roiAudit: 55,
      },
      benchmarks: 68,
      dataAudit: {
        contacts: 55,
        companies: 25,
        deals: 68,
        tickets: 35,
      },
    },
    '003': {
      id: '003',
      createDate: '22-Jan-2025',
      overallScore: 80,
      globalAverage: 66,
      industryAverage: 65,
      scores: {
        dateAudit: 50,
        salesAudit: 85,
        marketingAudit: 78,
        serviceAudit: 80,
        roiAudit: 75,
      },
      benchmarks: 72,
      dataAudit: {
        contacts: 65,
        companies: 40,
        deals: 80,
        tickets: 50,
      },
    },
    '004': {
      id: '004',
      createDate: '30-Jan-2025',
      overallScore: 58,
      globalAverage: 66,
      industryAverage: 59,
      scores: {
        dateAudit: 30,
        salesAudit: 50,
        marketingAudit: 60,
        serviceAudit: 55,
        roiAudit: 50,
      },
      benchmarks: 65,
      dataAudit: {
        contacts: 45,
        companies: 20,
        deals: 50,
        tickets: 25,
      },
    },
  };

  return reports[reportId] || null;
};

export const fetchReportList = async (state) => {
  try {
    const response = await fetch("https://tapir-relaxing-partly.ngrok-free.app/pastreports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "state": `${state}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching report list:", error);
    throw error;
  }
};

