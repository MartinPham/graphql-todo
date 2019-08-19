import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';
import initialState from '../config/initialState';

let store = null;

export default () => {
  if(store === null)
  {
    const composeEnhancers = typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    
      }) : compose;
  
    const sagaMiddleware = createSagaMiddleware();
    
    
    const middlewares = [sagaMiddleware];
    
    
    store = createStore(
      reducers,
      initialState,
      composeEnhancers(
        applyMiddleware(...middlewares)
      )
    );
    
    sagaMiddleware.run(sagas);
  }

  return store;
}

