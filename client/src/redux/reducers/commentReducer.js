import {
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_LOADING_FAILURE,
  COMMENT_UPLOAD_REQUEST,
  COMMENT_UPLOAD_SUCCESS,
  COMMENT_UPLOAD_FAILURE,
} from '../types';

const initialState = {
  comments: [],
  creatorId: '',
  loading: false,
  isAuthenticated: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_LOADING_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case COMMENT_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case COMMENT_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        isAuthenticated: true,
        loading: false,
      };
    case COMMENT_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
