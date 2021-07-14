import React from 'react';
import {useLazyQuery} from '@apollo/client';

import '../styles/elements.css';
import {Vaccine} from './vaccine';
import {Error, Loading} from './status';
import {VACCINE} from '../controllers/graphql/queries/q_vaccine';
import idGen from '../tools/idGen';

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
  const loadVaccineOrderButtonId = idGen(vaccinationId, 'loadVaccine', sourceBottle);
  return <details className='data highlight' id={vaccinationId} data-testid={vaccinationId} >
    <summary className='element' >{gender} - {vaccinated.toLocaleDateString()}</summary>
    <p className='element' >Vaccination ID: {vaccinationId}</p>
    <p className='element' >Gender: {gender}</p>
    <p className='element' >Vaccination date: {vaccinated.toLocaleString()}</p>
    {!called && <button className='element' id={loadVaccineOrderButtonId} data-testid={loadVaccineOrderButtonId} onClick={() => loadVaccineOrder()}>Load vaccine order</button>}
    {called && loading && <section style={{marginLeft: '2rem'}} ><Loading datatype='vaccine order' /></section>}
    {called && error && <section style={{marginLeft: '2rem'}} ><Error datatype='vaccine order' /></section>}
    {called && data && <Vaccine embedded={true} {...data.vaccine} />}
  </details>;
};

export default Vaccination;
