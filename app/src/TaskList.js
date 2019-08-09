import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';


export default () => {
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
    <ul>
    {data.tasks.map((task, index) => (
      <li key={index}>{task.name}</li>
    ))}
  </ul>
  );
}