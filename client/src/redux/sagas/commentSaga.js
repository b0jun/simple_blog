import axios from 'axios';
import { push } from 'connected-react-router';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import {
  COMMENT_LOADING_FAILURE,
  COMMENT_LOADING_SUCCESS,
  COMMENT_LOADING_REQUEST,
  COMMENT_UPLOAD_SUCCESS,
  COMMENT_UPLOAD_REQUEST,
  COMMENT_UPLOAD_FAILURE,
} from '../types';

//Load Comment
const loadCommentsAPI = (payload) => {
  console.log(payload, 'loadCommentAPI ID');
  return axios.get(`/api/post/${payload}/comments`);
};

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);
    console.log(result);
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

// UpLoad Comment
const uploadCommentsAPI = (payload) => {
  console.log(payload.id, 'loadCommentAPI ID');
  return axios.post(`/api/post/${payload.id}/comments`, payload);
};

function* uploadComments(action) {
  try {
    console.log(action);
    const result = yield call(uploadCommentsAPI, action.payload);
    console.log(result, 'UploadComment');
    yield put({
      type: COMMENT_UPLOAD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_UPLOAD_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchUpLoadComments() {
  yield takeEvery(COMMENT_UPLOAD_REQUEST, uploadComments);
}

export default function* commentSaga() {
  yield all([fork(watchLoadComments), fork(watchUpLoadComments)]);
}
