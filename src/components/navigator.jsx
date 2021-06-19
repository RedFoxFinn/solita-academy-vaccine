import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Vaccine from './vaccine';
import Vaccination from './vaccination';

const Navigator = (props) => {
  return <nav>
    <Link />
    <p>this is the navigational component of the application</p>
  </nav>;
};

export const Routing = () => {
  return <Switch>
    <Route exact path='/' children={<p>home</p>} />
    <Route path='/data' children={<p>data view</p>} />
    <Route path='/orders' children={<Vaccine/>} />
    <Route path='/vaccinations' children={<Vaccination/>} />
  </Switch>;
};

export default Navigator;