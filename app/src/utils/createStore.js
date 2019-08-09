import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducers from './createReducers';
import createSagas from './createSagas';
import initialState from '../config/initialState';

export default (client) => {
	const sagaMiddleware = createSagaMiddleware();

  const reducers = createReducers(client);
  const sagas = createSagas(client);

	const store = createStore(
		reducers, 
		initialState, 
		applyMiddleware(sagaMiddleware)
	);
	
	sagaMiddleware.run(sagas);

	return store;
}
