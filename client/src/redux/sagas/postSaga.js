import { push } from 'connected-react-router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
} from '../types';
import axios from 'axios';

const loadPostAPI = () => {
  return axios.get('/api/post');
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log('result: ', result);
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
    yield push('/');
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts)]);
}
