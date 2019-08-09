import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectTasks } from './selectors';
import { browseTasks } from './actions';
import { appendTask } from './actions';

import { gql } from 'apollo-boost';
import { useSubscription } from '@apollo/react-hooks';

export default () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const subscription = useSubscription(gql`
    subscription {
      taskAdded {
        name
      }
    }
  `);

  if(subscription.data && subscription.data.taskAdded)
  {
    dispatch(appendTask({
      name: subscription.data.taskAdded.name
    }));
  }

  useEffect(()=> {
    dispatch(browseTasks());
  }, []);

  return (
    <>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </>
  );
}