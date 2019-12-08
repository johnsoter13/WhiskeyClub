import React from 'react';
import {ListItem} from '@momentum-ui/react';
import moment from 'moment';

const ReviewItem = ({reviewName, reviewRating, reviewDetails, reviewAlcoholName, reviewTimestamp}) => (
  <ListItem key={`${reviewName}-review-${reviewAlcoholName}`} className="review-item-container">
    <div className="review-timestamp">
      {reviewTimestamp ? moment(reviewTimestamp).format("MM/DD/YYYY") : "Date"}
    </div>
    <div className="review-name">
      {reviewName}
    </div>
    <div className="review-alcohol-name">
      {reviewAlcoholName}
    </div>
    <div className="review-rating">
      {reviewRating}
    </div>
    <div className="review-details">
      {reviewDetails}
    </div>
  </ListItem>
);

export default ReviewItem;