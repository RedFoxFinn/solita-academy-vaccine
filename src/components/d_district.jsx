import React from 'react';

const District = ({districtData, district, totalCount}) => {
  const percentage = districtData.length / totalCount * 100;
  const genderPercentage = {
    f: 0,
    m: 0,
    n: 0
  };
  const vaccinePercentage = {
    a: 0,
    sb: 0,
    z: 0
  };
  const vaccines = {
    Antiqua: 0,
    SolarBuddhica: 0,
    Zerpfy: 0
  };
  const genders = {
    female: 0,
    male: 0,
    nonbinary: 0
  };
  districtData.forEach(entry => {
    switch (entry.gender) {
      case 'female': genders.female += 1; break;
      case 'male': genders.male += 1; break;
      case 'nonbinary': genders.nonbinary += 1; break;
      default: break;
    }
    switch (entry.vaccine) {
      case 'Antiqua': vaccines.Antiqua += 1; break;
      case 'SolarBuddhica': vaccines.SolarBuddhica += 1; break;
      case 'Zerpfy': vaccines.Zerpfy += 1; break;
      default: break;
    }
  });
  genderPercentage.f = genders.female / districtData.length * 100;
  genderPercentage.m = genders.male / districtData.length * 100;
  genderPercentage.n = genders.nonbinary / districtData.length * 100;
  vaccinePercentage.a = vaccines.Antiqua / districtData.length * 100;
  vaccinePercentage.sb = vaccines.SolarBuddhica / districtData.length * 100;
  vaccinePercentage.z = vaccines.Zerpfy / districtData.length * 100;
  return <section className='district' id={district} data-testid={district}>
    <p>{district}:</p>
    <p>~ {percentage.toFixed(2)}%, {districtData.length} vaccinations</p>
    <p>Female: ~ {genderPercentage.f.toFixed(2)}%, {genders.female} vaccinations</p>
    <p>Male: ~ {genderPercentage.m.toFixed(2)}%, {genders.male} vaccinations</p>
    <p>Nonbinary: ~ {genderPercentage.n.toFixed(2)}%, {genders.nonbinary} vaccinations</p>
    <p>Antiqua: ~ {vaccinePercentage.a.toFixed(2)}%, {vaccines.Antiqua} vaccinations</p>
    <p>SolarBuddhica: ~ {vaccinePercentage.sb.toFixed(2)}%, {vaccines.SolarBuddhica} vaccinations</p>
    <p>Zerpfy: ~ {vaccinePercentage.z.toFixed(2)}%, {vaccines.Zerpfy} vaccinations</p>
  </section>
};

export default District;