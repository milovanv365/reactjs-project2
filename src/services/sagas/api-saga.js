import { takeEvery, call, put } from "redux-saga/effects";
import * as ActionTypes from '../../constants/action-types'
import axios from "axios";

export default function* watcherSaga() {
  yield takeEvery(ActionTypes.DATA_REQUESTED, workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(getData);
    console.log(`payload is ${payload}`);
    yield put({ type: ActionTypes.DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: ActionTypes.API_ERRORED, payload: e });
  }
}

async function getData() {
  // return fetch("https://jsonplaceholder.typicode.com/posts").then(response =>
  //   response.json()
  // );

  let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return response.data
}
