import { takeEvery, call, put } from "redux-saga/effects";
import * as ActionTypes from '../../constants/action-types'
import axios from "axios";

export default function* watcherSaga() {
  yield takeEvery(ActionTypes.BLOG_LIST_REQUESTED, workerSagaGetBlogList);
  yield takeEvery(ActionTypes.BLOG_DETAIL_REQUESTED, workerSagaGetBlog);
  yield takeEvery(ActionTypes.BLOG_DELETE_REQUESTED, workerSagaDeleteBlog);
}

function* workerSagaGetBlogList() {
  try {
    const payload = yield call(getBlogList);
    yield put({ type: ActionTypes.BLOG_LIST_LOADED, payload });
  } catch (e) {
    yield put({ type: ActionTypes.API_ERRORED, payload: e });
  }
}

function* workerSagaGetBlog(action) {
  try {
    const payload = yield call(getBlog, action.payload);
    yield put({ type: ActionTypes.BLOG_DETAIL_LOADED, payload });
  } catch (e) {
    yield put({ type: ActionTypes.API_ERRORED, payload: e });
  }
}

function* workerSagaDeleteBlog(action) {
  try {
    const payload = yield call(deleteBlogData, action.payload);
  } catch (e) {
    yield put({ type: ActionTypes.API_ERRORED, payload: e });
  }
}

async function getBlogList() {
  // let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  let response = await axios.get('http://localhost:3001/posts')
  return response.data
}

async function getBlog({blogId}) {
  let response = await axios.get(`http://localhost:3001/posts/${blogId}`)
  return response.data
}


async function deleteBlogData({blogId}) {
  let response = await axios.delete(`http://localhost:3001/posts/${blogId}`)
  return response.data
}
