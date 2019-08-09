import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addTask } from './actions';

export default () => {
  const [name, setName] = useState('');
  
  const dispatch = useDispatch();

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      dispatch(addTask(name));
      setName('');
    }}>
      <input value={name} onChange={(event) => setName(event.target.value)}/>
      <button type="submit">Add</button>
    </form>
  );
};