import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import parameters from '../config/parameters';

// Create an http link:
const httpLink = new HttpLink({
  uri: parameters.graphqlEndpoint
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: parameters.graphqlSubscriptionEndpoint,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
export default () => split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);