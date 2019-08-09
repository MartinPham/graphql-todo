import http from 'http';
import express from 'express';
// import console from 'chalk-console';
import { ApolloServer } from 'apollo-server-express';
import { LocalStorage } from 'node-localstorage';
import { PubSub } from 'apollo-server';


const localStorage = new LocalStorage('./data');
const pubsub = new PubSub();

const typeDefs = require('./schemas').default;
const resolvers = require('./resolvers').default(localStorage, pubsub);



const PORT = process.env.PORT || 8081;


const createExpressApp = () => {
  console.info('Creating Express app');
  const app = express();


  console.info('Creating Apollo server');
  app.apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  app.apolloServer.applyMiddleware({ app });

  console.info('Express app created with Apollo middleware');

  return app;
}



if(!process.httpServer)
{
  console.info('Creating HTTP server');

  process.expressApp = createExpressApp();
  process.httpServer = http.createServer();

  process.expressApp.apolloServer.installSubscriptionHandlers(process.httpServer);

  process.httpServer.on('request', process.expressApp);
  process.httpServer.listen(PORT, () => {
    console.info(`HTTP server ready at http://localhost:${PORT}`);
    console.info(`Websocket server ready at ws://localhost:${PORT}`);
  });
} else {
  console.info('Reloading HTTP server');
  process.httpServer.removeListener('request', process.expressApp);
  process.expressApp = createExpressApp();
  process.expressApp.apolloServer.installSubscriptionHandlers(process.httpServer);
  process.httpServer.on('request', process.expressApp);
  console.info('HTTP server reloaded');
}

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    (async () => {
      await new Promise(resolve => process.httpServer.close(resolve));
      process.httpServer = null;
    })();
  })
}













