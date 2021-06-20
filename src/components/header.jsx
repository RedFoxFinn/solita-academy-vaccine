import React from 'react';

import Navigator from './navigator';

import isDev from '../tools/devstring';
import idGen from '../tools/idGen';
import inforeader from '../tools/inforeader';

import '../styles/elements.css';

const Header = ({id}) => {
  return <section id={id} data-testid={id} className='topelement' >
    <Heading id={idGen(id, 'heading')} />
    <Navigator id={idGen(id, 'navigator')} />
  </section>;
};

const Heading = ({id}) => {
  return <section className='header' id={id} data-testid={id} >
    <h2 >{isDev(inforeader.appname())}</h2>
  </section>;
};

export default Header;