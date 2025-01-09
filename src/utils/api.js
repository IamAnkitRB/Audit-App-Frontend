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

export const fetchAuditData = async () => {
  return {
    id: 102,
    createDate: '08-Jan-2025',
    overallScore: 53,
    globalAverage: 66,
    industryAverage: 59,
    scores: {
      dateAudit: 33,
      salesAudit: 33,
      marketingAudit: 56,
      serviceAudit: 56,
      roiAudit: 56,
    },
    benchmarks: 68,
    dataAudit: {
      contacts: 58,
      companies: 23,
      deals: 67,
      tickets: 33,
    },
  };
};
