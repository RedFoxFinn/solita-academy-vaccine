import React from 'react';

const Vaccine = ({
  id,
  orderNumber,
  responsiblePerson,
  healthCareDistrict,
  vaccine,
  injections,
  arrived
}) => {
  const arrivalDate = new Date(arrived);
  const monthInMilliseconds = 30*24*60*60*1000;
  const expirationDate = new Date(arrivalDate.valueOf()+monthInMilliseconds);
  return <section>
    <p>this is the data of one vaccine order</p>
    <p>{id}</p>
    <p>{orderNumber}</p>
    <p>{responsiblePerson}</p>
    <p>{healthCareDistrict}</p>
    <p>{vaccine}</p>
    <p>{injections}</p>
    <p>{arrivalDate.toLocaleString()}</p>
    <p>{expirationDate.toLocaleString()}</p>
  </section>;
};

export default Vaccine;