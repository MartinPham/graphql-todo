import React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import TaskList from './TaskList';
import CreateTask from './CreateTask';

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Hey</h1>
        <hr/>
        <CreateTask/>
        <hr/>
        <TaskList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
