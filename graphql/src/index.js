import http from 'http';
import express from 'express';
import console from 'chalk-console';
import { ApolloServer } from 'apollo-server-express';
import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./data');

const typeDefs = require('./schemas').default;
const resolvers = require('./resolvers').default(localStorage);



const PORT = process.env.PORT || 8081;


const createExpressApp = () => {
  console.info('Creating Express app');
  const app = express();


  console.info('Creating Apollo server');
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  apolloServer.applyMiddleware({ app });

  console.info('Express app created with Apollo middleware');

  return app;
}



if(!process.httpServer)
{
  console.info('Creating HTTP server');

  process.expressApp = createExpressApp();
  process.httpServer = http.createServer();

  process.httpServer.on('request', process.expressApp);
  process.httpServer.listen(PORT, () => {
    console.info(`HTTP server ready at http://localhost:${PORT}`);
  });
} else {
  console.info('Reloading HTTP server');
  process.httpServer.removeListener('request', process.expressApp);
  process.expressApp = createExpressApp();
  process.httpServer.on('request', process.expressApp);
  console.info('HTTP server reloaded');
}

if (module.hot) {
  module.hot.accept();
}


