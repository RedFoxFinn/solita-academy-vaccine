import React from 'react';

import isDev from '../tools/devstring';
import inforeader from '../tools/inforeader';

import '../styles/elements.css';

const Header = ({id}) => {
  return <section className='header' id={id} data-testid={id} >
    <h2 >{isDev(inforeader.appname())}</h2>
  </section>;
};

export default Header;