
const data_retriever = require('../tools/data_retriever');

const genders = ['female','male','nonbinary'];

describe('data_retriever tests', () => {
  let dummy = false;

  it('dummy test', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  // data_retriever should return set of Antiqua-vaccine order data with parameter 'antiqua'
  it('antiqua', async () => {
    const json_data = await data_retriever('antiqua');
    expect(json_data).toBeTruthy();
    expect(json_data.length).toBeGreaterThan(0);
    expect(json_data[0]).toBeTruthy();
    expect(json_data[0]).toHaveProperty('id');
    expect(json_data[0]).toHaveProperty('orderNumber');
    expect(json_data[0]).toHaveProperty('responsiblePerson');
    expect(json_data[0]).toHaveProperty('healthCareDistrict');
    expect(json_data[0]).toHaveProperty('vaccine');
    expect(json_data[0].vaccine).toMatch(/Antiqua/);
    expect(json_data[0]).toHaveProperty('injections');
    expect(json_data[0]).toHaveProperty('arrived');
  });
  // data_retriever should return set of SolarBuddhica-vaccine order data with parameter 'solar_buddhica'
  it('solar_buddhica', async () => {
    const json_data = await data_retriever('solar_buddhica');
    expect(json_data).toBeTruthy();
    expect(json_data.length).toBeGreaterThan(0);
    expect(json_data[0]).toBeTruthy();
    expect(json_data[0]).toHaveProperty('id');
    expect(json_data[0]).toHaveProperty('orderNumber');
    expect(json_data[0]).toHaveProperty('responsiblePerson');
    expect(json_data[0]).toHaveProperty('healthCareDistrict');
    expect(json_data[0]).toHaveProperty('vaccine');
    expect(json_data[0].vaccine).toMatch(/SolarBuddhica/);
    expect(json_data[0]).toHaveProperty('injections');
    expect(json_data[0]).toHaveProperty('arrived');
  });
  // data_retriever should return set of Zerpfy-vaccine order data with parameter 'zerpfy'
  it('zerpfy', async () => {
    const json_data = await data_retriever('zerpfy');
    expect(json_data).toBeTruthy();
    expect(json_data.length).toBeGreaterThan(0);
    expect(json_data[0]).toBeTruthy();
    expect(json_data[0]).toHaveProperty('id');
    expect(json_data[0]).toHaveProperty('orderNumber');
    expect(json_data[0]).toHaveProperty('responsiblePerson');
    expect(json_data[0]).toHaveProperty('healthCareDistrict');
    expect(json_data[0]).toHaveProperty('vaccine');
    expect(json_data[0].vaccine).toMatch(/Zerpfy/);
    expect(json_data[0]).toHaveProperty('injections');
    expect(json_data[0]).toHaveProperty('arrived');
  });
  // data_retriever should return set of vaccination data with parameter 'vaccinations'
  it('vaccinations', async () => {
    const json_data = await data_retriever('vaccinations');
    expect(json_data).toBeTruthy();
    expect(json_data.length).toBeGreaterThan(0);
    expect(json_data[0]).toBeTruthy();
    expect(json_data[0]).toHaveProperty('vaccination-id');
    expect(json_data[0]).toHaveProperty('sourceBottle');
    expect(json_data[0]).toHaveProperty('gender');
    expect(genders).toContain(json_data[0].gender);
    expect(json_data[0]).toHaveProperty('vaccinationDate');
  });
  // data_retriever should return null in any other case than above
  it('data_retriever returns null', async () => {
    const json_data = await data_retriever('vaccine');
    expect(json_data).toBeNull();
  });
  // data_retriever should return all data of vaccinations & every vaccine order with parameter 'all'
  it('all data', async () => {
    const json_data = await data_retriever('all');
    expect(json_data).toBeTruthy();
    expect(json_data).toHaveProperty('vaccinations');
    expect(json_data.vaccinations.length).toBeGreaterThan(0);
    expect(json_data.vaccinations[0]).toHaveProperty('vaccination-id');
    expect(json_data.vaccinations[0]).toHaveProperty('sourceBottle');
    expect(json_data.vaccinations[0]).toHaveProperty('gender');
    expect(genders).toContain(json_data.vaccinations[0].gender);
    expect(json_data.vaccinations[0]).toHaveProperty('vaccinationDate');
    expect(json_data).toHaveProperty('vaccines');
    expect(json_data.vaccines).toHaveProperty('antiqua');
    expect(json_data.vaccines.antiqua.length).toBeGreaterThan(0);
    expect(json_data.vaccines.antiqua[0]).toHaveProperty('id');
    expect(json_data.vaccines.antiqua[0]).toHaveProperty('orderNumber');
    expect(json_data.vaccines.antiqua[0]).toHaveProperty('responsiblePerson');
    expect(json_data.vaccines.antiqua[0]).toHaveProperty('healthCareDistrict');
    expect(json_data.vaccines.antiqua[0]).toHaveProperty('vaccine');
    expect(json_data.vaccines.antiqua[0].vaccine).toMatch(/Antiqua/);
    expect(json_data.vaccines.antiqua[0]).toHaveProperty('injections');
    expect(json_data.vaccines.antiqua[0]).toHaveProperty('arrived');
    expect(json_data.vaccines).toHaveProperty('solar_buddhica');
    expect(json_data.vaccines.solar_buddhica.length).toBeGreaterThan(0);
    expect(json_data.vaccines.solar_buddhica[0]).toHaveProperty('id');
    expect(json_data.vaccines.solar_buddhica[0]).toHaveProperty('orderNumber');
    expect(json_data.vaccines.solar_buddhica[0]).toHaveProperty('responsiblePerson');
    expect(json_data.vaccines.solar_buddhica[0]).toHaveProperty('healthCareDistrict');
    expect(json_data.vaccines.solar_buddhica[0]).toHaveProperty('vaccine');
    expect(json_data.vaccines.solar_buddhica[0].vaccine).toMatch(/SolarBuddhica/);
    expect(json_data.vaccines.solar_buddhica[0]).toHaveProperty('injections');
    expect(json_data.vaccines.solar_buddhica[0]).toHaveProperty('arrived');
    expect(json_data.vaccines).toHaveProperty('zerpfy');
    expect(json_data.vaccines.zerpfy.length).toBeGreaterThan(0);
    expect(json_data.vaccines.zerpfy[0]).toHaveProperty('id');
    expect(json_data.vaccines.zerpfy[0]).toHaveProperty('orderNumber');
    expect(json_data.vaccines.zerpfy[0]).toHaveProperty('responsiblePerson');
    expect(json_data.vaccines.zerpfy[0]).toHaveProperty('healthCareDistrict');
    expect(json_data.vaccines.zerpfy[0]).toHaveProperty('vaccine');
    expect(json_data.vaccines.zerpfy[0].vaccine).toMatch(/Zerpfy/);
    expect(json_data.vaccines.zerpfy[0]).toHaveProperty('injections');
    expect(json_data.vaccines.zerpfy[0]).toHaveProperty('arrived');
  });
});
