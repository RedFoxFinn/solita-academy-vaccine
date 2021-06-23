import React from 'react';
import {useLazyQuery} from '@apollo/client';

import '../styles/elements.css';
import {SimpleVaccine, Vaccine} from './vaccine';
import {Error, Loading} from './status';
import {VACCINE} from '../controllers/graphql/queries/q_vaccine';

const Vaccination = ({
  vaccinationId,
  gender,
  sourceBottle,
  vaccinationDate
}) => {
  const [loadVaccineOrder, {called, data, error, loading}] = useLazyQuery(VACCINE, {
    variables: {
      by: 'id',
      id: sourceBottle
    }
  });
  const vaccinated = new Date(vaccinationDate);
  return <details className='data highlight' >
    <summary className='element' >{gender} - {vaccinated.toLocaleDateString()}</summary>
    <p className='element' >Vaccination ID: {vaccinationId}</p>
    <p className='element' >Gender: {gender}</p>
    <p className='element' >Vaccination date: {vaccinated.toLocaleString()}</p>
    {!called && <button className='element' id={`order_${sourceBottle}`} onClick={() => loadVaccineOrder()}>Load vaccine order</button>}
    {called && loading && <section style={{marginLeft: '2rem'}} ><Loading datatype='vaccine order' /></section>}
    {called && error && <section style={{marginLeft: '2rem'}} ><Error datatype='vaccine order' /></section>}
    {called && data && <Vaccine embedded={true} {...data.vaccine} />}
  </details>;
};

export default Vaccination;
