import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {useQuery} from '@apollo/client';

import Home from './home';
import Vaccine from './vaccine';
import Vaccination from './vaccination';
import inforeader from '../tools/inforeader';
import {VACCINATIONS} from '../controllers/graphql/queries/q_vaccination';
import {VACCINES} from '../controllers/graphql/queries/q_vaccine';
import RenderVaccines from './r_vaccines';
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
  const vaccine = inforeader.vaccineSample();
  const vaccination = inforeader.vaccinationSample();

  const vaccinations = useQuery(VACCINATIONS);
  const vaccines = useQuery(VACCINES);

  return <section className='viewer'>
    <Switch>
      <Route exact path='/' children={<Home />} />
      <Route path='/data' children={
        vaccines.loading || vaccines.error || vaccinations.loading || vaccinations.error
          ? <DataVisualisation/>
          : <DataVisualisation/>
      } />
      <Route path='/orders' children={
        vaccines.loading || vaccines.error
          ? vaccines.loading ? <Loading datatype='vaccine orders' /> : <Error datatype='vaccine orders' />
          : <RenderVaccines vaccines={vaccines.data.vaccines} />
      }/>
      <Route path='/vaccinations' children={
        vaccinations.loading || vaccinations.error
          ? vaccinations.loading ? <Loading datatype='vaccinations' /> : <Error datatype='vaccinations' />
          : <RenderVaccinations vaccinations={vaccinations.data.vaccinations} />
      }/>
    </Switch>
  </section>;
};

export default Navigator;