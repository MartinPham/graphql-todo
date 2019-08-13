import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducers from './createReducers';
import createSagas from './createSagas';
import initialState from '../config/initialState';



export default (client) => {
  const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

      }) : compose;

	const sagaMiddleware = createSagaMiddleware();

  const reducers = createReducers(client);
  const sagas = createSagas(client);

  const middlewares = [sagaMiddleware];


	const store = createStore(
		reducers, 
    initialState, 
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
	);
	
	sagaMiddleware.run(sagas);

	return store;
}
