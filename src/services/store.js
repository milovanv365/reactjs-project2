import Reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import apiSaga from "./sagas/api-saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  Reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(apiSaga)

export default store;
