
const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType
  } = data;

  const impact = {};
  const severeImpact = {};
  // challenge 1

  const currentlyInfected = reportedCases * 10;
  const currentInfections = reportedCases * 50;

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentInfections = reportedCases * 50;


  // check if the timeToElapse in in days weeks or months
  let timeFactor;
  // eslint-disable-next-line no-empty
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

  const infectedByRequestedTime = timeFactor ** 2;

  impact.infectedByRequestedTime = timeFactor ** 2;
  severeImpact.infectedByRequestedTime = timeFactor ** 2;

  // challenge 2

  impact.severeCasesByRequestedTime = infectedByRequestedTime * 0.15;


  return {
    data,
    impact: { currentlyInfected, infectedByRequestedTime },
    severeImpact: { currentInfections, infectedByRequestedTime }
  };
};

export default covid19ImpactEstimator;
