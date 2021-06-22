import React from 'react';

export const Vaccine = ({
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
  return <details>
    <summary>{vaccine} - {orderNumber}</summary>
    <p>{id}</p>
    <p>{orderNumber}</p>
    <p>{responsiblePerson}</p>
    <p>{healthCareDistrict}</p>
    <p>{vaccine}</p>
    <p>{injections}</p>
    <p>{arrivalDate.toLocaleString()}</p>
    <p>{expirationDate.toLocaleString()}</p>
  </details>;
};

export const SimpleVaccine = ({
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
  return <p>simple {id}</p>
};

export default Vaccine;