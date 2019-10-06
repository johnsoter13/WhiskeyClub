import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session/index';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : null
      }
    </AuthUserContext.Consumer>
  </div>
);
const NavigationAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
    <hr />
  </div>
);

export default Navigation;