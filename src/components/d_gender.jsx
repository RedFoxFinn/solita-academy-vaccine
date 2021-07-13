import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { InlineIcon } from '@iconify/react';
import arrowRight from '@iconify-icons/mdi-light/arrow-right';

import { VACCINATION_COUNT } from '../controllers/graphql/queries/q_vaccination';
import { Error, Loading } from './status';

const Gender = ({gender, totalCount}) => {
  const [loadVaccinationCount, {called, data, error, loading}] = useLazyQuery(VACCINATION_COUNT, {
    variables: {
      by: 'gender',
      gender: gender.toLowerCase()
    }
  });
  let percentage;
    if (!called) {
      loadVaccinationCount();
    }
    if (called && !loading && !error && data) {
      percentage = data.vaccinationCount / totalCount * 100;
    }
    return <section className='subset'>
      <p>{gender}:</p>
      {called
        ? loading
          ? <Loading datatype='vaccination count by gender' />
          : error
            ? <Error datatype='vaccination count by gender' />
            : data && <p>~ {percentage.toFixed(2)}% {<InlineIcon icon={arrowRight} />} {data.vaccinationCount} individuals</p>
        : <Loading datatype='vaccination count by gender' />
      }
    </section>;
};

export default Gender;