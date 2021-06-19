import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import Navigator, {Routing} from './navigator';

const Frontend = (props) => {
  return <Router>
    <Header/>
    <Navigator/>
    <Routing/>
    <Footer/>
  </Router>;
};

export default Frontend;