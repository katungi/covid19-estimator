
const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType
  } = data;

  const impact = {};
  const severeImpact = {};

  // challenge 1

  impact.currentlyInfected = Math.trunc(reportedCases * 10);
  severeImpact.currentInfections = Math.trunc(reportedCases * 50);

  // check if the timeToElapse in in days weeks or months
  let timeFactor;

  switch (periodType) {
    case 'month':
      timeFactor = Math.trunc(timeToElapse / 3) * 30;
      break;
    case 'week':
      timeFactor = Math.trunc(timeToElapse / 3) * 7;
      break;
    default:
      timeFactor = Math.trunc(timeToElapse / 3);
      break;
  }
  // time passed as infection rates grow
  impact.infectedByRequestedTime = 100;
  severeImpact.infectedByRequestedTime = timeFactor ** 2;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
