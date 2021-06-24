import React from 'react';

import {Vaccine} from './vaccine';

const RenderOrders = ({orders}) => {
  return <section id='orders' >
    {orders
      ? orders.map(vaccine => <Vaccine embedded={false} {...vaccine} />)
      : <p>Orders</p>}
  </section>
};

export default RenderOrders;