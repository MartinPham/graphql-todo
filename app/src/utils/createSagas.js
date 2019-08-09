import sagas from '../sagas'

export default (client) => {
  const _sagas = sagas;
  return function* () {
    yield sagas(client);
  };
}