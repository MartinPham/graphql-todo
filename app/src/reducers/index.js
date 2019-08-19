import { combineReducers } from 'redux';
import produce from 'immer';

const taskReducer = (state = null, action = null) => {
  if(action) 
  {
    if(action.type === 'TASKS_SET')
    {
      return action.tasks.map(task => ({
        name: task.name
      }))
    }
    else if(action.type === 'TASKS_APPEND')
    {
      return produce(state, draft => {
        draft.push({
          name: action.task.name
        })
      })
    }
  }
    
	return state;
};

export default combineReducers({
  tasks: taskReducer
});