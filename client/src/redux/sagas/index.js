import { all, fork } from 'redux-saga/effects';
import dotenv from 'dotenv';
import axios from 'axios';
import authSage from './authSaga';
import postSage from './postSaga';
import commentSaga from './commentSaga';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([fork(authSage), fork(postSage), fork(commentSaga)]);
}
