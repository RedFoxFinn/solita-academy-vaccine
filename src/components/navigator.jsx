import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import Home from './home';
import Vaccine from './vaccine';
import Vaccination from './vaccination';

import inforeader from '../tools/inforeader';

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
  const vaccine = inforeader.vaccineSample();
  const vaccination = inforeader.vaccinationSample();
  return <section className='viewer'>
    <Switch>
      <Route exact path='/' children={<Home />} />
      <Route path='/data' children={<p>data view</p>} />
      <Route path='/orders' children={<Vaccine {...vaccine}/>} />
      <Route path='/vaccinations' children={<Vaccination {...vaccination}/>} />
    </Switch>
  </section>;
};

export default Navigator;