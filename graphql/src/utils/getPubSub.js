import { PubSub } from 'apollo-server';

let pubsub = null;

export default () => {
  if(pubsub === null)
  {
    pubsub = new PubSub();
  }

  return pubsub;
}
