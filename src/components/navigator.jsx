import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './home';
import RenderOrders from './r_orders';
import RenderVaccinations from './r_vaccinations';
import DataVisualisation from './d_visualise';
import {Error, Loading} from './status';
import idGen from '../tools/idGen';

import '../styles/global.css';
import '../styles/elements.css';

const Navigator = ({id}) => {
  const activeStyle = {color: 'rgb(61,61,61)', textDecoration: 'solid underline', textDecorationColor: 'rgb(220,30,50)'};
  const inactiveStyle = {color: 'rgb(61,61,61)', textDecoration: 'none'};
  const separator = <p style={{color: 'rgb(61,61,61'}}> | </p>;
  const navlinkIds = {
    home: idGen(id, 'navlink', 'home'),
    data: idGen(id, 'navlink', 'data'),
    orders: idGen(id, 'navlink', 'orders'),
    vaccinations: idGen(id, 'navlink', 'vaccinations')
  };
  return <React.Fragment>
    <nav className='row navigator' >
      <NavLink
        to='/'
        inactiveStyle={inactiveStyle}
        id={navlinkIds.home}
        data-testid={navlinkIds.home}>Home</NavLink>
      {separator}
      <NavLink
        to='/data'
        activeStyle={activeStyle}
        inactiveStyle={inactiveStyle}
        id={navlinkIds.data}
        data-testid={navlinkIds.data}>Data</NavLink>
      {separator}
      <NavLink
        to='/orders'
        activeStyle={activeStyle}
        inactiveStyle={inactiveStyle}
        id={navlinkIds.orders}
        data-testid={navlinkIds.orders}>Orders</NavLink>
      {separator}
      <NavLink
        to='/vaccinations'
        activeStyle={activeStyle}
        inactiveStyle={inactiveStyle}
        id={navlinkIds.vaccinations}
        data-testid={navlinkIds.vaccinations}>Vaccinations</NavLink>
    </nav>
  </React.Fragment>;
};

export const Routing = (props) => {
  const vaccinations = useSelector(state => state.vaccinations);
  const orders = useSelector(state => state.orders);
  const composite = useSelector(state => state.composite);
  const routingId = idGen(props.id, 'routing')

  function checkOrderStatus() {
    return orders.status === 'done' ? true : false;
  }
  function checkVaccinationStatus() {
    return vaccinations.status === 'done' ? true : false;
  }
  function checkCompositeDataStatus() {
    return composite.status === 'done' ? true : false;
  }

  return <section className='viewer' id={routingId} data-testid={routingId}>
    <Switch>
      <Route exact path='/' children={<Home id={idGen(props.id, 'home')} />} />
      <Route path='/data' children={
        checkOrderStatus() && checkVaccinationStatus() && checkCompositeDataStatus()
          ? <DataVisualisation id={idGen(props.id, 'data')} />
          : <Loading datatype='composite data' />
      } />
      <Route path='/orders' children={
        orders.status === 'loading' || orders.status === 'error'
          ? orders.status === 'loading' ? <Loading datatype='vaccine orders' /> : <Error datatype='vaccine orders' />
          : <RenderOrders orders={orders.data} id={idGen(props.id, 'orders')} />
      }/>
      <Route path='/vaccinations' children={
        vaccinations.status === 'loading' || vaccinations.status === 'error'
          ? vaccinations.status === 'loading' ? <Loading datatype='vaccinations' /> : <Error datatype='vaccinations' />
          : <RenderVaccinations vaccinations={vaccinations.data} id={idGen(props.id, 'vaccinations')} />
      }/>
    </Switch>
  </section>;
};

export default Navigator;