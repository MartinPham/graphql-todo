export default (state, action, client = null) => {
  console.log(action)
  if(action.type === 'TASKS_SET')
  {
    const newState = {...state};
    newState.tasks = action.tasks;

    return newState;
  }
  else if(action.type === 'TASKS_APPEND')
  {
    const newState = {...state};
    newState.tasks.push(action.task);

    return newState;
  }
	return state;
};