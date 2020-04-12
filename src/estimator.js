
const covid19ImpactEstimator = (data) => {
  const { reportedCases, timePassed, period } = data;

  const currentlyInfected = reportedCases * 10;
  const currentInfections = reportedCases * 50;

  // check if the timePassed in in days weeks or months
  let timeFactor;
  // eslint-disable-next-line no-empty
  switch (period.toLowerCase()) {
    case 'month':
      timeFactor = Math.trunc(timePassed / 3) * 30;
      break;
    case 'week':
      timeFactor = Math.trunc(timePassed / 3) * 7;
      break;
    default:
      timeFactor = Math.trunc(timePassed / 3);
      break;
  }
  // time passed as infection rates grow

  const infectedByRequestedTime = timeFactor ** 2;


  return {
    data,
    impact: { currentlyInfected, infectedByRequestedTime },
    severeImpact: { currentInfections, infectedByRequestedTime }
  };
};

export default covid19ImpactEstimator;
