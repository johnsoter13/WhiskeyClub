import React from 'react';
import {ListItem, ListItemSection} from '@momentum-ui/react';

const ReviewItem = ({reviewName, reviewRating, reviewDetails}) => (
  <ListItem className="review-item-container">
    <ListItemSection className="review-name" position='left'>
      {reviewName}
    </ListItemSection>
    <ListItemSection className="review-rating" position='center'>
      {reviewRating}
    </ListItemSection>
    <ListItemSection className="review-details" position='right'>
      {reviewDetails}
    </ListItemSection>
  </ListItem>
);

export default ReviewItem;