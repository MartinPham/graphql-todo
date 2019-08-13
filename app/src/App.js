import React from 'react';

import TaskList from './TaskList';
import CreateTask from './CreateTask';

import { useDispatch } from 'react-redux';
import { resetTasks } from './actions';


function App() {
  const dispatch = useDispatch();

  return (
      <div>
        <h1>Hey</h1>
        <button onClick={() => {
          dispatch(resetTasks([]))
        }}>Clear</button>
        <hr/>
        <CreateTask/>
        <hr/>
        <TaskList/>
      </div>
  );
}

export default App;
