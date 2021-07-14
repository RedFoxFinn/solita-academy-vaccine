import React from 'react';

export const Error = (props) => {
  const id = `error-${props.datatype}`;
  return <section id={id} data-testid={id} >
    <p>Error loading {props.datatype}</p>
  </section>;
};

export const Loading = (props) => {
  const id = `loading-${props.datatype}`;
  return <section id={id} data-testid={id} >
    <p>Loading {props.datatype}</p>
  </section>;
};