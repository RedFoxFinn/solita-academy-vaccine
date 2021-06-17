import React from 'react';

import isDev from '../tools/devstring';
import inforeader from '../tools/inforeader';

const Footer = (props) => {
  return <section>
    <h6 style={{color: 'purple'}} >{isDev(inforeader.appid())}</h6>
  </section>;
};

export default Footer;