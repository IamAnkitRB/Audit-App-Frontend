export const findRiskImage = (risk) => {
  const HIGH_RISK =
    'https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/red@2x.png';
  const MEDIUM_RISK =
    'https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/yellow@2x.png';
  const LOW_RISK =
    'https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/right@2x.png';
  if (risk === 'High Risk') {
    return HIGH_RISK;
  } else if (risk === 'Moderate Risk') {
    return MEDIUM_RISK;
  } else {
    return LOW_RISK;
  }
};
export const findRiskImageForObject = (value) => {
  const HIGH_RISK =
    'https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/red@2x.png';
  const MEDIUM_RISK =
    'https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/yellow@2x.png';
  const LOW_RISK =
    'https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/right@2x.png';
  if (value < 25) {
    return HIGH_RISK;
  } else if (value < 75) {
    return MEDIUM_RISK;
  } else {
    return LOW_RISK;
  }
};

export const getBorderColor = (risk) => {
  if (risk === 'High Risk') return 'border-red';
  if (risk === 'Moderate Risk') return 'border-orange';
  if (risk === 'No Risk') return 'border-green';
  return 'border-green';
};
