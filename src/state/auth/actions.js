import {SUCCESS, PENDING} from '../constants';

import {LOGIN} from './constants';

export const loginAction = (user) => (dispatch) => {
  dispatch({
    type: LOGIN,
    status: PENDING,
  });

  console.log(user);

  return dispatch({
    type: LOGIN,
    status: SUCCESS,
    payload: user,
  });
}