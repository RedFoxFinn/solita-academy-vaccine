import React, { useState } from 'react';

import {Vaccine} from './vaccine';

const RenderOrders = ({orders, id}) => {
  const [sorting, setSorting] = useState('oNumA');
  const setSortingOrder = (order) => {
    switch (order) {
      case 'orderNumberA': setSorting('oNumA'); break;
      case 'orderNumberD': setSorting('oNumD'); break;
      default: setSorting('oNumA');
    }
  }
  const getSorted = () => {
    const data = orders;
    switch (sorting) {
      case 'oNumA': return data;
      case 'oNumD': return data.sort((a,b) => a.orderNumber < b.orderNumber ? 1 : -1);
      default: return data;
    }
  };
  return <section id={id} data-testid={id} >
    {orders
      ? getSorted().map(vaccine => <Vaccine embedded={false} {...vaccine} />)
      : <p>Orders</p>}
  </section>
};

export default RenderOrders;