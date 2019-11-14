import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@momentum-ui/react';

import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';
import SignOutButton from '../SignOut';

const HomePage = () => (
    <div className="app-container">
      <h1 className="home-header"><Link to={ROUTES.HOME}>Whiskey Club</Link></h1>
      <SignOutButton />
      <div className="home-content-container">
        <div className="option-container">
          <Button className="home-header-button"><Link to={ROUTES.POST_REVIEW}>Post a Review</Link></Button>
        </div>
        <div className="option-container">
          <Button className="home-header-button"><Link to={ROUTES.VIEW_REVIEWS}>View Reviews</Link></Button>
        </div>
      </div>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);