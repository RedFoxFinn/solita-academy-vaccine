import React from 'react';

import '../styles/elements.css';

export const Vaccine = ({
  id,
  orderNumber,
  responsiblePerson,
  healthCareDistrict,
  vaccine,
  injections,
  arrived,
  embedded = false
}) => {
  const arrivalDate = new Date(arrived);
  const monthInMilliseconds = 30*24*60*60*1000;
  const expirationDate = new Date(arrivalDate.valueOf()+monthInMilliseconds);
  return <details className={embedded ? 'data' : 'data highlight'} >
    <summary className='element' >{vaccine} - {orderNumber}</summary>
    <p className='element' style={{marginTop: '0.5rem'}} >Vaccine vial ID: {id}</p>
    <p className='element' >Vaccine order number: {orderNumber}</p>
    <p className='element' >Responsible person: {responsiblePerson}</p>
    <p className='element' >Healthcare district: {healthCareDistrict}</p>
    <p className='element' >Vaccine: {vaccine}</p>
    <p className='element' >Injections / vial: {injections}</p>
    <p className='element' >Date of arrival: {arrivalDate.toLocaleString()}</p>
    <p className='element' >Date of expiration: {expirationDate.toLocaleString()}</p>
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
