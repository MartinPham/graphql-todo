import getStorage from '../utils/getStorage';
import getPubSub from '../utils/getPubSub';

const storage = getStorage();
const pubsub = getPubSub();

export default {
  Query: {
    tasks: (root, args, context, info) => {
      return storage.get('tasks');
    }
  },
  Mutation: {
    addTask: (root, {name}, context, info) => {
      const tasks = storage.get('tasks');
      
      const newTask = {
        name
      };
      tasks.push(newTask);
      storage.set('tasks', tasks);

      pubsub.publish('TASK_ADDED', { taskAdded: newTask });

      return true;
    },
    removeAllTasks: (root, args, context, info) => {
      storage.set('tasks', []);

      pubsub.publish('TASK_RESET', { taskReset: true });

      return true;
    }
  },
  Subscription: {
    taskAdded: {
      subscribe: () => pubsub.asyncIterator(['TASK_ADDED']),
    },
    taskReset: {
      subscribe: () => pubsub.asyncIterator(['TASK_RESET'])
    }
  }
};