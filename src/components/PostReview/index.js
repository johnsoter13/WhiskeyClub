import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Form, Button, Input, Select, SelectOption} from '@momentum-ui/react';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';
import { withFirebase } from '../Firebase';

const PostReview = () => (
    <div className="app-container">
      <h1 className="home-header"><Link to={ROUTES.HOME}>Whiskey Club</Link></h1>
      <div className="post-review-container">
        <div className="post-review">
          <PostReviewForm />
        </div>
      </div>
    </div>
);

const INITIAL_STATE = {
    alcoholType: '',
    alcoholRating: '',
    review: '',
};

class PostReviewFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = event => {
      const { alcoholType, alcoholRating, review } = this.state;
      console.log(alcoholRating);
      console.log(alcoholType);
      this.props.firebase
        .doAddReview({alcoholType, alcoholRating, review})
        .then(() => {
          this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          this.setState({ error });
        });
  
      event.preventDefault();
    };
  
    selectOnChange = (event, name) => {
      this.setState({ [name]: event[0].value });
    };

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

  
    render() {
      const { alcoholType, alcoholRating, review, error } = this.state;
  
      const isInvalid = alcoholType === '' || alcoholRating === '';
              
      return (
        <Form onSubmit={this.onSubmit}>
          <Select className="post-review-dropdown-button" defaultValue="Select Alcohol Type" onSelect={(e) => this.selectOnChange(e, 'alcoholType')} >
            <SelectOption value='whiskey' label='Whiskey' />
            <SelectOption value='vodka' label='Vodka'  />
            <SelectOption value='rum' label='Rum' />
            <SelectOption value='tequila' label='Tequila' />
            <SelectOption value='gin' label='Gin' />
            <SelectOption value='cordial' label='Cordial' />
          </Select>
          <Select className="post-review-dropdown-button" defaultValue="Select Rating" onSelect={(e) => this.selectOnChange(e, 'alcoholRating')} >
            <SelectOption value='0' label='0 Star' />
            <SelectOption value='1' label='1 Star'  />
            <SelectOption value='2' label='2 Star' />
            <SelectOption value='3' label='3 Star' />
            <SelectOption value='4' label='4 Star' />
            <SelectOption value='5' label='5 Star' />
          </Select>
          <Input 
            name="review"
            value={review}
            onChange={this.onChange}
            type="text"
            multiline
            placeholder="Write your review here!" 
          />
          <Button disabled={isInvalid} type="submit">
            Submit Rating
          </Button>
  
          {error && <p>{error.message}</p>}
        </Form>
      );
    }
  }

const condition = authUser => !!authUser;

const PostReviewForm = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition)
)(PostReviewFormBase);

export default PostReview;

export {PostReviewForm};