import React from 'react';
import {ListItem} from '@momentum-ui/react';

const ReviewItem = ({reviewName, reviewRating, reviewDetails, reviewBrand, reviewAlcoholName}) => (
  <ListItem key={`${reviewName}-review-${reviewAlcoholName}`} className="review-item-container">
    <div className="review-name">
      {reviewName}
    </div>
    <div className="review-brand">
      {reviewBrand}
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