import reducers from '../reducers'

export default (client) => {
  const _reducers = reducers;
  return (state, action) => _reducers(state, action, client);
}