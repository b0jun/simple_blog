import { push } from 'connected-react-router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_UPLOAD_SUCCESS,
  POST_EDIT_UPLOAD_FAILURE,
  POST_EDIT_UPLOAD_REQUEST,
} from '../types';
import axios from 'axios';

// All Posts load
const loadPostAPI = () => {
  return axios.get('/api/post');
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log('loadPosts: ', result);
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

// Post Upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.post('/api/post', payload, config);
};

function* uploadPosts(action) {
  try {
    console.log('uploadPost function: ', action);
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, '@uploadPostAPI, action.payload@');
    yield put({
      type: POST_UPLOAD_SUCCESS,
      payload: result.data,
    });
    //업로드 성공시 리다이렉트
    yield put(push(`/posts/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOAD_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchUploadPosts() {
  yield takeEvery(POST_UPLOAD_REQUEST, uploadPosts);
}

// Post Detail
const loadPostDetailAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(result, '@post_detail_saga_data');
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/posts/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

// Post Delete
const DeletePostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.delete(`/api/post/${payload.id}`, config);
};

function* DeletePost(action) {
  try {
    const result = yield call(DeletePostAPI, action.payload);
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, DeletePost);
}

// Post Edit Load
const PostEditLoadAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.get(`/api/post/${payload.id}/edit`, config);
};

function* PostEditLoad(action) {
  try {
    const result = yield call(PostEditLoadAPI, action.payload);
    yield put({
      type: POST_EDIT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchPostEditLoad() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, PostEditLoad);
}

// Post Edit UpLoad
const PostEditUploadAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* PostEditUpload(action) {
  try {
    const result = yield call(PostEditUploadAPI, action.payload);
    yield put({
      type: POST_EDIT_UPLOAD_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOAD_FAILURE,
      payload: e,
    });
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOAD_REQUEST, PostEditUpload);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPosts),
    fork(watchloadPostDetail),
    fork(watchDeletePost),
    fork(watchPostEditLoad),
    fork(watchPostEditUpload),
  ]);
}
