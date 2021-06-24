import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import { useSelector } from 'react-redux';

import Home from './home';
import RenderOrders from './r_orders';
import RenderVaccinations from './r_vaccinations';
import DataVisualisation from './d_visualise';
import {Error, Loading} from './status';

import '../styles/global.css';
import '../styles/elements.css';

const Navigator = (props) => {
  const activeStyle = {color: 'rgb(61,61,61)', textDecoration: 'solid underline', textDecorationColor: 'rgb(220,30,50)'};
  const inactiveStyle = {color: 'rgb(61,61,61)', textDecoration: 'none'};
  const separator = <p style={{color: 'rgb(61,61,61'}}> | </p>;
  return <React.Fragment>
    <nav className='row navigator' >
      <NavLink to='/' inactiveStyle={inactiveStyle} >Home</NavLink>
      {separator}
      <NavLink to='/data' activeStyle={activeStyle} inactiveStyle={inactiveStyle} >Data</NavLink>
      {separator}
      <NavLink to='/orders' activeStyle={activeStyle} inactiveStyle={inactiveStyle} >Orders</NavLink>
      {separator}
      <NavLink to='/vaccinations' activeStyle={activeStyle} inactiveStyle={inactiveStyle} >Vaccinations</NavLink>
    </nav>
  </React.Fragment>;
};

export const Routing = () => {
  const vaccinations = useSelector(state => state.vaccinations);
  const orders = useSelector(state => state.orders);

  return <section className='viewer'>
    <Switch>
      <Route exact path='/' children={<Home />} />
      <Route path='/data' children={
        orders.status === 'loading' || orders.status === 'error' || vaccinations.status === 'loading' || vaccinations.status === 'error'
          ? <DataVisualisation/>
          : <DataVisualisation/>
      } />
      <Route path='/orders' children={
        orders.status === 'loading' || orders.status === 'error'
          ? orders.status === 'loading' ? <Loading datatype='vaccine orders' /> : <Error datatype='vaccine orders' />
          : <RenderOrders orders={orders.data} />
      }/>
      <Route path='/vaccinations' children={
        vaccinations.status === 'loading' || vaccinations.status === 'error'
          ? vaccinations.status === 'loading' ? <Loading datatype='vaccinations' /> : <Error datatype='vaccinations' />
          : <RenderVaccinations vaccinations={vaccinations.data} />
      }/>
    </Switch>
  </section>;
};

export default Navigator;