import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery, useSubscription } from '@apollo/react-hooks';


export default () => {
  const subscription = useSubscription(gql`
    subscription {
      taskAdded {
        name
      }
    }
  `);

  const { loading, error, data } = useQuery(gql`
    {
      tasks {
        name
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  

  return (
    <>
      <ul>
        {data.tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>

      {subscription.data && subscription.data.taskAdded && (
        <b>{subscription.data.taskAdded.name} added</b>
      )}
    </>
  );
}