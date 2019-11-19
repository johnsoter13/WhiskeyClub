import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../src/styles/index.scss';
import Firebase, { FirebaseContext } from './components/Firebase';
import { Provider } from 'react-redux';

import createStore from './state/store';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);


