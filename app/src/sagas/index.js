import { takeLatest, put, all } from 'redux-saga/effects'
import { gql } from 'apollo-boost';
import { setTasks } from '../actions';

function* browseTasks(action, client) {
  const { data } = yield client.query({
    query: gql`
      {
        tasks {
          name
        }
      }
    `
  });

  yield put(setTasks(data.tasks));
}
function* addTask({ name }, client) {
  const { data } = yield client.mutate({
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

export default function* (client) {
  yield all([
    takeLatest('TASK_BROWSE', function*(action) {
      yield browseTasks(action, client)
    }),
    takeLatest('TASK_ADD', function*(action) {
      yield addTask(action, client)
    })
  ]);
};