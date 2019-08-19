import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import getStore from './utils/getStore';

import { ApolloProvider } from '@apollo/react-hooks';
import getClient from './utils/getClient';


import App from './components/App';




ReactDOM.render(
  (
  <ApolloProvider client={getClient()}>
    <Provider store={getStore()}>
      <App />
    </Provider>
  </ApolloProvider>
  ), 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
