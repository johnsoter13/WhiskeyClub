import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div className="navigation-container">
    <h1 className="home-header"><Link to={ROUTES.HOME}>Whiskey Club</Link></h1>
    <SignOutButton />
  </div>
);


export default Navigation;