import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';

import client from './controllers/graphql/client';
import store from './controllers/state/store';

import Frontend from './components/frontend';

import inforeader from './tools/inforeader';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <ApolloProvider client={client} >
        <Frontend id={inforeader.appid()} />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
