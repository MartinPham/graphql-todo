import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';


export default (link) => new ApolloClient({
  link,
  cache: new InMemoryCache()
});
