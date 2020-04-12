
const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds
  } = data;

  const impact = {};
  const severeImpact = {};

  // challenge 1 answers
  impact.currentlyInfected = Math.trunc(reportedCases * 10);
  severeImpact.currentlyInfected = Math.trunc(reportedCases * 50);

  // check if the timeToElapse in in days weeks or months
  let timeFactor;

  switch (periodType.trim().toLowerCase()) {
    case 'months':
      timeFactor = Math.trunc((timeToElapse * 30) / 3);
      break;
    case 'weeks':
      timeFactor = Math.trunc((timeToElapse * 7) / 3);
      break;
    case 'days':
      timeFactor = Math.trunc((timeToElapse) / 3);
      break;
    default:
  }

  // time passed as infection rates grow
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** timeFactor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** timeFactor);


  // challenge 2

  const impactRequestedTime = impact.infectionsByRequestedTime * 0.15;
  const severeImpactRequest = severeImpact.infectionsByRequestedTime * 0.15;

  impact.severeCasesByRequestedTime = Math.trunc(impactRequestedTime);
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpactRequest);

  const bedsAvailable = totalHospitalBeds * 0.35;
  const ImpactHospitalBedval = bedsAvailable - impactRequestedTime;
  const sevImpactHospitalBedval = bedsAvailable - severeImpactRequest;

  impact.hospitalBedsByRequestedTime = Math.trunc(ImpactHospitalBedval);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(sevImpactHospitalBedval);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
