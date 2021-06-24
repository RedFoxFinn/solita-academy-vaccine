import React from 'react';
import { useSelector } from 'react-redux';

import Vaccination from './vaccination';

const RenderVaccinations = (props) => {
  const vaccinations = useSelector(state => state.vaccinations.data);
  return <section id='vaccinations' >
    {vaccinations
      ? vaccinations.map(vaccination => <Vaccination {...vaccination} />)
      : <p>Vaccinations</p>}
  </section>;
};

export default RenderVaccinations;