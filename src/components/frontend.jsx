import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import Header from './header';
import Footer from './footer';
import {Routing} from './navigator';
import idGen from '../tools/idGen';
import {VACCINATIONS} from '../controllers/graphql/queries/q_vaccination';
import {VACCINES} from '../controllers/graphql/queries/q_vaccine';
import databuilder from '../tools/databuilder';
import Navigator from './navigator';

import '../styles/elements.css';

const Frontend = (props) => {
  const stateVaccinations = useSelector(state => state.vaccinations);
  const stateOrders = useSelector(state => state.orders);
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
  }, [vaccinations, dispatch]);
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
  }, [orders, dispatch]);

  useEffect(() => {
    if (stateOrders.status === 'done' && stateVaccinations.status === 'done' && orders.data && vaccinations.data) {
      dispatch({type: 'composite/setStatus', status: 'loading'});
      const compositeData = databuilder(stateVaccinations.data, stateOrders.data);
      dispatch({type: 'composite/setComposite', compositeData: compositeData});
      dispatch({type: 'composite/setStatus', status: 'done'});
    }
  }, [dispatch, stateOrders, stateVaccinations, orders, vaccinations]);

  return <article className='column' id={props.id} data-testid={props.id} >
    <Router>
      <section id={idGen(props.id, 'header')} className='topelement'>
        <Header id={idGen(props.id, 'heading')} />
        <Navigator id={idGen(props.id, 'navigator')} />
      </section>
      <Routing id={props.id} />
      <Footer id={idGen(props.id, 'footer')} />
    </Router>
  </article>;
};

export default Frontend;