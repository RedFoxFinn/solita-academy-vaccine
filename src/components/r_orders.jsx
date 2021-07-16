import React, { useState } from 'react';

import {Vaccine} from './vaccine';

const RenderOrders = ({orders, id}) => {
  const [sorting, setSorting] = useState('oNumAsc');
  /*
    const setSortingOrder = (order) => {
      switch (order) {
        case 'orderNumberAsc': setSorting('oNumAsc'); break;
        case 'orderNumberDesc': setSorting('oNumDesc'); break;
        default: setSorting('oNumAsc');
      }
    }
  */
  const getSorted = () => {
    const data = orders;
    switch (sorting) {
      case 'oNumAsc': return data;
      case 'oNumDesc': return data.sort((a,b) => a.orderNumber < b.orderNumber ? 1 : -1);
      default: return data;
    }
  };
  return <section id={id} data-testid={id} >
    {orders
      ? getSorted().map(vaccine => <Vaccine embedded={false} {...vaccine} key={`vaccinekey-${vaccine.id}`} />)
      : <p>Orders . . .</p>}
  </section>
};

export default RenderOrders;