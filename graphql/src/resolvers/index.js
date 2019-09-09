import getStorage from '../utils/getStorage';
import getPubSub from '../utils/getPubSub';

const storage = getStorage();
const pubsub = getPubSub();

export default {
  Query: {
    tasks: (root, args, context, info) => {
      return storage.get('tasks');
    },
    users: (root, args, context, info) => {
      return storage.get('users');
    },
    friendships: (root, args, context, info) => {
      const friendships = storage.get('friendships');
      const users = storage.get('users');
      return friendships.map(friendship => friendship.users.map(ref => users.filter(user => user.name === ref)[0]));
    },
    user: (root, args, context, info) => {
      const users = storage.get('users');
      const user = users.filter(user => user.name === args.name)[0];
      return user;
    }
  },
  Task: {
    user: (root, args, context, info) => {
      const users = storage.get('users');
      for(let user of users)
      {
        if(user.name === root.user_name)
        {
          return user;
        }
      }

      return null;
    }
  },
  User: {
    tasks: (root, args, context, info) => {
      const tasks = storage.get('tasks');
      return tasks.filter(task => task.user_name === root.name);
    },
    friends: (root, args, context, info) => {
      const friendships = storage.get('friendships');

      const users = storage.get('users');
      const userFriendships = friendships.filter(friendship => friendship.users.indexOf(root.name) > -1);

      let friendRefs = userFriendships.map(friendship => friendship.users.filter(user => user !== root.name));
      friendRefs = friendRefs.reduce((accumulator, friendRef) => accumulator.concat(friendRef));

      return users.filter(user => friendRefs.indexOf(user.name) > -1);
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