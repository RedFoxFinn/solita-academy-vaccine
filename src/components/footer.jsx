import React from 'react';

import isDev from '../tools/devstring';
import inforeader from '../tools/inforeader';

import '../styles/elements.css';

const Footer = (props) => {
  const repoinfo = inforeader.repoinfo();
  const authorinfo = inforeader.authorinfo();

  return <section className='row footer' id={props.id} data-testid={props.id} >
    <a href={repoinfo.url} >{isDev(inforeader.appid())}</a>
    <a href={authorinfo.url} title={authorinfo.name} >{authorinfo.alias}</a>
  </section>;
};

export default Footer;