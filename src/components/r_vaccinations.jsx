import React from 'react';
import { useSelector } from 'react-redux';

import Vaccination from './vaccination';

const RenderVaccinations = ({id}) => {
  const vaccinations = useSelector(state => state.vaccinations.data);
  return <section id={id} data-testid={id} >
    {vaccinations
      ? vaccinations.map(vaccination => <Vaccination {...vaccination} />)
      : <p>Vaccinations</p>}
  </section>;
};

export default RenderVaccinations;