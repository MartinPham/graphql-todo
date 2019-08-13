export const browseTasks = () => ({
  type: 'TASK_BROWSE'
});
export const resetTasks = () => ({
  type: 'TASK_RESET'
});

export const addTask = (name) => ({
  type: 'TASK_ADD',
  name
});

export const setTasks = (tasks) => ({
  type: 'TASKS_SET',
  tasks
});
export const appendTask = (task) => ({
  type: 'TASKS_APPEND',
  task
});