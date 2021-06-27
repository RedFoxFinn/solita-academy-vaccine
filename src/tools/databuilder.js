
const databuilder = (vaccinations, orders) => {
  let vData = [];
  vaccinations.forEach(vaccination => {
    const order = orders.find(o => o.id === vaccination.sourceBottle);
    vData.push({
      vaccinationId: vaccination.vaccinationId,
      gender: vaccination.gender,
      vaccinationDate: new Date(vaccination.vaccinationDate).valueOf(),
      vaccineOrderId: order.id,
      orderNumber: order.orderNumber,
      healthCareDistrict: order.healthCareDistrict,
      responsiblePerson: order.responsiblePerson,
      vaccine: order.vaccine,
      injections: order.injections,
      vaccineArrivalDate: new Date(order.arrived).valueOf()
    });
  });
  return vData;
};

export default databuilder;