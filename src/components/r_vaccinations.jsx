import React from 'react';
import { useSelector } from 'react-redux';

import Vaccination from './vaccination';

const RenderVaccinations = ({id}) => {
  const {data, status} = useSelector(state => state.vaccinations);
  return <section id={id} data-testid={id} >
    {status === 'done' && data && data.length > 0
      ? data.map(vaccination => <Vaccination {...vaccination} key={`vaccinationkey-${vaccination.vaccinationId}`} />)
      : <p>Vaccinations . . .</p>}
  </section>;
};

export default RenderVaccinations;