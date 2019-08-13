import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectTasks } from './selectors';
import { browseTasks } from './actions';
import { appendTask } from './actions';
import { setTasks } from './actions';

import { gql } from 'apollo-boost';
import { useSubscription } from '@apollo/react-hooks';

export default () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  console.log('tasks', tasks)

  
  const taskAddedSubscription = useSubscription(gql`
    subscription {
      taskAdded {
        name
      }
    }
  `, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('taskAddedSubscription', subscriptionData)
      dispatch(appendTask({
        name: subscriptionData.data.taskAdded.name
      }));
    }
  });
  
  const taskResetSubscription = useSubscription(gql`
    subscription {
      taskReset
    }
  `, {
    onSubscriptionData: () => {
      console.log('taskResetSubscription')
      dispatch(setTasks([]));
    }
  });



  useEffect(()=> {
    dispatch(browseTasks());
  }, []);

  return (
    <>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.get('name')}</li>
        ))}
      </ul>
    </>
  );
}