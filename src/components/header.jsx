import React from 'react';

import isDev from '../tools/devstring';
import inforeader from '../tools/inforeader';

const Header = (props) => {
  return <section>
    <h3 style={{color: 'purple'}} >{isDev(inforeader.appname())}</h3>
  </section>;
};

export default Header;