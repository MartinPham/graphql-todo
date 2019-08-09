const initStorage = (storage) => {
  const tasksData = storage.getItem('tasks');
  if(!tasksData)
  {
    storage.setItem('tasks', JSON.stringify([]));
  }
}

export default (storage) => ({
  Query: {
    tasks: (root, args, context, info) => {
      initStorage(storage);
      return JSON.parse(storage.getItem('tasks'));
    }
  },
  Mutation: {
    addTask:  (root, {name}, context, info) => {
      initStorage(storage);
      const tasks = JSON.parse(storage.getItem('tasks'));
      const newTask = {
        name
      };
      tasks.push(newTask);
      storage.setItem('tasks', JSON.stringify(tasks));

      return true;
    }
  }
});