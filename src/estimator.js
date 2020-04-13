
const covid19ImpactEstimator = (data) => {
  const {
    region: {
      name,
      avgDailyIncomeInUsd,
      avgDailyIncomePopulation
    },
    reportedCases,
    timeToElapse,
    periodType,
    population,
    totalHospitalBeds
  } = data;

  const impact = {};
  const severeImpact = {};


  // challenge 1
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

  // challenge 3

  const ImpactCasesforICU = impact.infectionsByRequestedTime * 0.05;
  const sevImpactCasesforICU = severeImpact.infectionsByRequestedTime * 0.05;
  const ImpactVentilator = impact.infectionsByRequestedTime * 0.02;
  const sevImpactVentilator = severeImpact.infectionsByRequestedTime * 0.02;

  impact.casesForICUByRequestedTime = Math.trunc(ImpactCasesforICU);
  severeImpact.casesForICUByRequestedTime = Math.trunc(sevImpactCasesforICU);

  impact.casesForVentilatorsByRequestedTime = ImpactVentilator;
  severeImpact.casesForVentilatorsByRequestedTime = sevImpactVentilator;

  let newDay;
  if (periodType === 'months') {
    newDay = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    newDay = timeToElapse * 7;
  } else if (periodType === 'days') {
    newDay = timeToElapse * 1;
  }
  const totalAvg = avgDailyIncomeInUsd * avgDailyIncomePopulation;
  const arith = impact.infectionsByRequestedTime * totalAvg;
  const fill = severeImpact.infectionsByRequestedTime * totalAvg;
  const sevArith = fill;
  const metic = arith / newDay;
  const sevMetic = sevArith / newDay;

  impact.dollarsFlight = Math.trunc(metic);
  severeImpact.dollarsFlight = Math.trunc(sevMetic);

  impact.region = name;
  impact.population = population;

  severeImpact.region = name;
  severeImpact.population = population;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
