import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';

import client from './controllers/graphql/client';

import Frontend from './components/frontend';

import inforeader from './tools/inforeader';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <Frontend id={inforeader.appid()} />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
