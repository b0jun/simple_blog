const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  PASSWORD_EDIT_UPLOAD_REQUEST,
  PASSWORD_EDIT_UPLOAD_SUCCESS,
  PASSWORD_EDIT_UPLOAD_FAILURE,
} = require('../types');

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: '',
  userId: '',
  userName: '',
  userRole: '',
  errorMsg: '',
  successMsg: '',
  previousMatchMsg: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    /* 전부 같은 동작함 */
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        isLoading: false,
        errorMsg: '',
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        token: null,
        user: null,
        userId: null,
        userRole: null,
        isLoading: false,
        errorMsg: action.payload.data.msg,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userId: null,
        userRole: null,
        isLoading: false,
        errorMsg: '',
      };

    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role,
      };
    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: '',
      };
    case PASSWORD_EDIT_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PASSWORD_EDIT_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMsg: action.payload.success_msg,
        errorMsg: '',
        previousMatchMsg: '',
      };
    case PASSWORD_EDIT_UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        successMsg: '',
        errorMsg: action.payload.fail_msg,
        previousMatchMsg: action.payload.match_msg,
      };
    //모달창이 끝난 후, 에러를 지우지 않으면, 향후에 클릭시 에러가 그대로 남아있음
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: '',
        previousMatchMsg: '',
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: 'Clear Error Fail',
        previousMatchMsg: 'Clear Error Fail',
      };
    default:
      return state;
  }
};

export default authReducer;
