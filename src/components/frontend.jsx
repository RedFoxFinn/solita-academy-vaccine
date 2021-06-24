import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {useDispatch} from 'react-redux';

import { setVaccinations, setStatus } from '../controllers/state/s_vaccination';
import Header from './header';
import Footer from './footer';
import {Routing} from './navigator';
import idGen from '../tools/idGen';
import {VACCINATIONS} from '../controllers/graphql/queries/q_vaccination';
import {VACCINES} from '../controllers/graphql/queries/q_vaccine';

import '../styles/elements.css';

const Frontend = (props) => {
  const vaccinations = useQuery(VACCINATIONS);
  const orders = useQuery(VACCINES);
  const dispatch = useDispatch();
  useEffect(() => {
    if (vaccinations.loading) {
      dispatch({type: 'vaccinations/setStatus', status: 'loading'});
    }
    if (vaccinations.error) {
      dispatch({type: 'vaccinations/setStatus', status: 'error'});
    }
    if (vaccinations.data) {
      dispatch({type: 'vaccinations/setStatus', status: 'done'});
      dispatch({type: 'vaccinations/setVaccinations', vaccinations: vaccinations.data.vaccinations});
    }
  }, [vaccinations, dispatch])
  useEffect(() => {
    if (orders.loading) {
      dispatch({type: 'orders/setStatus', status: 'loading'});
    }
    if (orders.error) {
      dispatch({type: 'orders/setStatus', status: 'error'});
    }
    if (orders.data) {
      dispatch({type: 'orders/setStatus', status: 'done'});
      dispatch({type: 'orders/setOrders', orders: orders.data.vaccines});
    }
  }, [orders, dispatch])
  return <article className='column' id={props.id} data-testid={props.id} >
    <Router>
      <Header id={idGen(props.id, 'header')} />
      <Routing baseId={`${props.id}.route`} />
      <Footer id={idGen(props.id, 'footer')} />
    </Router>
  </article>;
};

export default Frontend;