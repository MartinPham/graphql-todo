import React, { useState } from 'react';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';


export default () => {
  const [name, setName] = useState('');
  const [addTask] = useMutation(gql`
    mutation AddTask($name: String) {
      addTask(name: $name)
    }
  `);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      addTask({
        variables: {
          name
        }
      });
      setName('');
    }}>
      <input value={name} onChange={(event) => setName(event.target.value)}/>
      <button type="submit">Add</button>
    </form>
  );
};