import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import { withAuthentication } from '../Session/index';

import * as ROUTES from '../../constants/routes';
import PostReview from '../PostReview';

const App = () => (
  <Router>
      <div className="container">
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.POST_REVIEW} component={PostReview} />
      </div>
  </Router>
);

export default withAuthentication(App);