import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import {Routing} from './navigator';
import idGen from '../tools/idGen';

import '../styles/elements.css';

const Frontend = (props) => {
  return <article className='column' id={props.id} data-testid={props.id} >
    <Router>
      <Header id={idGen(props.id, 'header')} />
      <Routing baseId={`${props.id}.route`} />
      <Footer id={idGen(props.id, 'footer')} />
    </Router>
  </article>;
};

export default Frontend;