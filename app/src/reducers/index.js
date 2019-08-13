import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const taskReducer = (state = null, action = null, client = null) => {
  if(action) 
  {
    if(action.type === 'TASKS_SET')
    {
      return fromJS(action.tasks.map(task => ({
        name: task.name
      })))
    }
    else if(action.type === 'TASKS_APPEND')
    {
      return state.push({
        name: action.task.name
      })
    }
  }
    
	return state;
};

export default combineReducers({
  tasks: taskReducer
});