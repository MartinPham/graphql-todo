import http from 'http';
import express from 'express';
import console from 'chalk-console';
import { ApolloServer } from 'apollo-server-express';


import { LocalStorage } from 'node-localstorage';
import { PubSub } from 'apollo-server';


const localStorage = new LocalStorage('./data');
const pubsub = new PubSub();

const typeDefs = require('./schemas').default;
const resolvers = require('./resolvers').default(localStorage, pubsub);



const PORT = process.env.PORT || 8081;


const configureHttpServer = (httpServer) => {
  console.info('Creating Express app');
  const expressApp = express();


  console.info('Creating Apollo server');
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  apolloServer.applyMiddleware({ 
    app: expressApp 
  });

  console.info('Express app created with Apollo middleware');

  httpServer.on('request', expressApp);
  apolloServer.installSubscriptionHandlers(httpServer);
}



if(!process.httpServer)
{
  console.info('Creating HTTP server');

  process.httpServer = http.createServer();

  configureHttpServer(process.httpServer);

  process.httpServer.listen(PORT, () => {
    console.info(`HTTP server ready at http://localhost:${PORT}`);
    console.info(`Websocket server ready at ws://localhost:${PORT}`);
  });
} else {
  console.info('Reloading HTTP server');
  process.httpServer.removeAllListeners('upgrade');
  process.httpServer.removeAllListeners('request');

  configureHttpServer(process.httpServer);

  console.info('HTTP server reloaded');
}



if (module.hot) {
  module.hot.accept();
}







