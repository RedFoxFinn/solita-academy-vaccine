import React from 'react';
import {useQuery} from '@apollo/client';

import Vaccination from './vaccination';
import {VACCINE} from '../controllers/graphql/queries/q_vaccine';

const RenderVaccinations = ({vaccinations}) => {
  return <section id='vaccinations' >
    {vaccinations
      ? vaccinations.map(vaccination => <Vaccination {...vaccination} />)
      : <p>Vaccinations</p>}
  </section>;
};

export default RenderVaccinations;