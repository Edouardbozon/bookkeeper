import axios from 'axios';
import { api } from '../../../common/env';
import {
  LOGIN_LOGOUT_BEGIN,
  LOGIN_LOGOUT_SUCCESS,
  LOGIN_LOGOUT_FAILURE,
  LOGIN_LOGOUT_DISMISS_ERROR,
} from './constants';

export function logout(formData = {}) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOGOUT_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      axios.post(`${api}logout`, formData).then(
        (res) => {
          dispatch({
            type: LOGIN_LOGOUT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: LOGIN_LOGOUT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLogoutError() {
  return {
    type: LOGIN_LOGOUT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOGIN_LOGOUT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        logoutPending: true,
        logoutError: null,
      };

    case LOGIN_LOGOUT_SUCCESS:
      // The request is success
      return {
        ...state,
        logoutPending: false,
        logoutError: null,
      };

    case LOGIN_LOGOUT_FAILURE:
      // The request is failed
      return {
        ...state,
        logoutPending: false,
        logoutError: action.data.error,
      };

    case LOGIN_LOGOUT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        logoutError: null,
      };

    default:
      return state;
  }
}
