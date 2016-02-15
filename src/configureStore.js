import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middlewares = [thunk];

let enhancer;
if (typeof __DEV__ !== 'undefined' && __DEV__) {
  const devTools = require('remote-redux-devtools');
  enhancer = compose(
    applyMiddleware(...middlewares),
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678
    })
  );
} else {
  enhancer = applyMiddleware(...middlewares);
}

export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer);
}
