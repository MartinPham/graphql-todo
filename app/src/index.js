import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import createStore from './utils/createStore';


import { ApolloProvider } from '@apollo/react-hooks';
import createLink from './utils/createLink';
import createClient from './utils/createClient';

import App from './App';


const link = createLink();
const client = createClient(link);

const store = createStore(client);



ReactDOM.render(
  (
  <ApolloProvider client={client}>
    <Provider store={store}>
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
