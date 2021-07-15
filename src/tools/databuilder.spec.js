import databuilder from './databuilder';
import inforeader from './inforeader';

describe('databuilder', () => {
  let dummy = false;
  const order = inforeader.vaccineSample();
  const vaccination = inforeader.vaccinationSample();
  const databuild = databuilder([vaccination], [order]);
  let data;
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('databuild', () => {
    expect(databuild).toBeTruthy();
    expect(databuild.length).toBe(1);
    data = databuild[0];
  });
  it('databuild - vaccination data', () => {
    expect(data.vaccinationId).toMatch(vaccination.vaccinationId);
    expect(data.gender).toMatch(vaccination.gender);
    expect(new Date(data.vaccinationDate).valueOf()).toEqual(new Date(vaccination.vaccinationDate).valueOf());
    expect(data.vaccineOrderId).toMatch(vaccination.sourceBottle);
  });
  it('databuild - vaccine order data', () => {
    expect(data.vaccineOrderId).toMatch(vaccination.sourceBottle);
    expect(data.orderNumber).toEqual(order.orderNumber);
    expect(data.healthCareDistrict).toMatch(order.healthCareDistrict);
    expect(data.responsiblePerson).toMatch(order.responsiblePerson);
    expect(data.vaccine).toMatch(order.vaccine);
    expect(data.injections).toEqual(order.injections);
    expect(new Date(data.vaccineArrivalDate).valueOf()).toEqual(new Date(order.arrived).valueOf());
  });
});