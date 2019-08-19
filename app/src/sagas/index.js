import { takeLatest, put, all } from 'redux-saga/effects'
import { gql } from 'apollo-boost';
import { setTasks } from '../actions';

import getClient from '../utils/getClient';

function* browseTasks(action) {
  const { data } = yield getClient().query({
    query: gql`
      {
        tasks {
          name
        }
      }
    `
  });

  yield put(setTasks(data.tasks.map(task => ({
    name: task.name
  }))));
}

function* addTask({ name }) {
  const { data } = yield getClient().mutate({
    mutation: gql`
      mutation AddTask($name: String) {
        addTask(name: $name)
      }
    `,
    variables: {
      name
    }
  });
}

function* resetTasks(action) {
  const { data } = yield getClient().mutate({
    mutation: gql`
      mutation {
        removeAllTasks
      }
    `
  });
}

export default function* (client) {
  yield all([
    takeLatest('TASK_BROWSE', browseTasks),
    takeLatest('TASK_ADD', addTask),
    takeLatest('TASK_RESET', resetTasks)
  ]);
};