import {SUCCESS, PENDING} from '../constants';

import {LOGIN} from './constants';

export const loginAction = (user) => (dispatch) => {
  dispatch({
    type: LOGIN,
    status: PENDING,
  });

  return dispatch({
    type: LOGIN,
    status: SUCCESS,
    payload: user,
  });
}