import React from 'react';

import Header from './header';
import Footer from './footer';
import Navigator from './navigator';
import Vaccine from './vaccine';
import Vaccination from './vaccination';

const Frontend = (props) => {
  return <article>
    <Header/>
    <Navigator/>
    <Vaccine/>
    <Vaccination/>
    <Footer/>
  </article>;
};

export default Frontend;