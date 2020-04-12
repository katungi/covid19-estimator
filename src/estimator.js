
const covid19ImpactEstimator = (data) => {
  const {
    // reportedCases,
    timeToElapse,
    periodType,
    totalHostpitalBeds
  } = data;

  const impact = {};
  const severeImpact = {};

  // challenge 1

  //   impact.currentlyInfected = reportedCases * 10;
  //   severeImpact.currentInfections = reportedCases * 50;

  impact.currentlyInfected = 10;
  severeImpact.currentInfections = 50;

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

  //   impact.infectedByRequestedTime = timeFactor ** 2;
  //   severeImpact.infectedByRequestedTime = timeFactor ** 2;

  impact.infectedByRequestedTime = 100;
  severeImpact.infectedByRequestedTime = timeFactor ** 2;

  // challenge 2

  impact.severeCasesByRequestedTime = impact.infectedByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = impact.infectedByRequestedTime * 0.15;

  impact.hospitalBedsByRequestedTime = totalHostpitalBeds * 0.35;
  severeImpact.hospitalBedsByRequestedTime = totalHostpitalBeds * 0.35;

  // challenge 3

  impact.casesForICUByRequestedTime = impact.infectedByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = severeImpact.infectedByRequestedTime * 0.05;

  return {
    data,
    estimator: { impact, severeImpact }
  };
};

export default covid19ImpactEstimator;
