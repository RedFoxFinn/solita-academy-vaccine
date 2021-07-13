import React from 'react';
import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { InlineIcon } from '@iconify/react';
import arrowRight from '@iconify-icons/mdi-light/arrow-right';

import { VACCINE_ORDER_COUNT } from '../controllers/graphql/queries/q_vaccine';
import { Error, Loading } from './status';

const Order = ({vaccineBrand, totalCount}) => {
  const orders = useSelector(state => state.orders);
  const [loadVaccineOrderCount, {called, data, error, loading}] = useLazyQuery(VACCINE_ORDER_COUNT, {
    variables: {
      by: 'brand',
      brand: vaccineBrand
    }
  });
  let percentage;
  let injectionsPerOrder;
  if (!called) {
    loadVaccineOrderCount();
  }
  if (called && !loading && !error && data) {
    percentage = data.vaccineOrderCount / totalCount * 100;
    orders.data.find(order => injectionsPerOrder = order.vaccine === vaccineBrand ? order.injections : 0);
  }
  return <section className='subset'>
    <p>{vaccineBrand}:</p>
    {called
      ? loading
        ? <Loading datatype='order count by brand' />
        : error
          ? <Error datatype='order count by brand' />
          : data && <React.Fragment>
            <p>~ {percentage.toFixed(2)}% {<InlineIcon icon={arrowRight} />} {data.vaccineOrderCount} orders</p>
            <p>{injectionsPerOrder} injections / order, {data.vaccineOrderCount * injectionsPerOrder} injections in total</p>
          </React.Fragment>
      : <Loading datatype='order count by brand' />
    }
  </section>;
};

export default Order;