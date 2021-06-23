import React from 'react';

import {Vaccine} from './vaccine';

const RenderVaccines = ({vaccines}) => {
  return <section id='vaccines' >
    {vaccines
      ? vaccines.map(vaccine => <Vaccine embedded={false} {...vaccine} />)
      : <p>Vaccines</p>}
  </section>
};

export default RenderVaccines;