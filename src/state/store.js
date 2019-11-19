import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import auth from '../state/auth/reducer';

const reducer = combineReducers({
  auth,
});

export default (initialState) => createStore(reducer, {...initialState}, composeWithDevTools(applyMiddleware(thunk)));