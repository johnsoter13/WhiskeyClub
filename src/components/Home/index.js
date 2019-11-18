import React from 'react';
import {withRouter} from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';
import Navigation from '../Navigation';

const HomePage = ({history}) => (
    <div className="app-container">
      <Navigation />
      <div className="home-content-container">
        <div className="option-container" onClick={() => {
          history.push(ROUTES.POST_REVIEW);
        }}>
           <h2 className="option-header">Post a Review</h2>
        </div>
        <div className="option-container" onClick={() => {
          history.push(ROUTES.VIEW_REVIEWS);
        }}>
          <h2 className="option-header">View Reviews</h2>
        </div>
      </div>
    </div>
);

const condition = authUser => !!authUser;

export default compose(
  withRouter,
  withAuthorization(condition, ROUTES.SIGN_IN)
)(HomePage);