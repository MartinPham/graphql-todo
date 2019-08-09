import React from 'react';

import TaskList from './TaskList';
import CreateTask from './CreateTask';


function App() {
  return (
      <div>
        <h1>Hey</h1>
        <hr/>
        <CreateTask/>
        <hr/>
        <TaskList/>
      </div>
  );
}

export default App;
