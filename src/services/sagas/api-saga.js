import { takeEvery, all, call, put } from "redux-saga/effects";
import * as ActionTypes from '../../constants/action-types'
import axios from "axios";

export default function* watcherSaga() {
  yield takeEvery(ActionTypes.BLOG_DATA_REQUESTED, workerSagaGetBlogData);
  yield takeEvery(ActionTypes.BLOG_DATA_DELETED, workerSagaDeleteBlogData);
}

function* workerSagaGetBlogData() {
  try {
    const payload = yield call(getBlogData);
    console.log(`payload is ${payload}`);
    yield put({ type: ActionTypes.BLOG_DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: ActionTypes.API_ERRORED, payload: e });
  }
}

function* workerSagaDeleteBlogData() {
  try {
    const payload = yield call(deleteBlogData);
    console.log(`payload is ${payload}`);
    yield put({ type: ActionTypes.BLOG_DATA_DELETED, payload });
  } catch (e) {
    yield put({ type: ActionTypes.API_ERRORED, payload: e });
  }
}

async function getBlogData() {
  // let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  let response = await axios.get('http://localhost:3001/posts')
  return response.data
}

async function deleteBlogData() {
  let response = await axios.delete('http://localhost:3001/posts')
  return response.data
}
