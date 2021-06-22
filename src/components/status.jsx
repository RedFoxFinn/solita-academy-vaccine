import React from 'react';

export const Error = (props) => {
  return <section id={`error-${props.datatype}`} >
    <p>Error loading {props.datatype}</p>
  </section>;
};

export const Loading = (props) => {
  return <section id={`loading-${props.datatype}`} >
    <p>Loading {props.datatype}</p>
  </section>;
};