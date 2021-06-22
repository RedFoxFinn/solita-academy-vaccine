import React from 'react';
import {useLazyQuery} from '@apollo/client';

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
  return <details>
    <summary>{gender} - {vaccinated.toLocaleString()}</summary>
    <p>{vaccinationId}</p>
    <p>{gender}</p>
    {!called && <button id={`order_${sourceBottle}`} onClick={() => loadVaccineOrder()}>{sourceBottle}</button>}
    {called && loading && <Loading datatype='vaccine order' />}
    {called && error && <Error datatype='vaccine order' />}
    {called && data && <Vaccine {...data.vaccine} />}
  </details>;
};

export default Vaccination;