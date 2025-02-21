export const findRiskImage = (risk) => {
  const HIGH_RISK =
    'https://img.icons8.com/?size=48&id=Sb9rYobIrMId&format=png';
  const MEDIUM_RISK =
    'https://img.icons8.com/?size=96&id=5tH5sHqq0t2q&format=png';
  const LOW_RISK = 'https://img.icons8.com/?size=96&id=sz8cPVwzLrMP&format=png';
  if (risk === 'High Risk') {
    return HIGH_RISK;
  } else if (risk === 'Moderate Risk') {
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
