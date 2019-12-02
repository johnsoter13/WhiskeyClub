import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Form, Button, Input, Select, SelectOption} from '@momentum-ui/react';
import { compose } from 'recompose';
import moment from 'moment';

import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';
import { withFirebase } from '../Firebase';
import Navigation from '../Navigation';
import {selectUser} from '../../state/auth/selectors';

const PostReview = () => (
    <div className="app-container">
      <Navigation />
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
    alcoholName: '',
    alcoholBrand: ''
};

class PostReviewFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = event => {
      event.preventDefault();
      const username = this.props.user.displayName;
      const timestamp = moment.now();

      const { alcoholType, alcoholRating, review, alcoholName, alcoholBrand} = this.state;
      this.props.firebase
        .doAddReview({alcoholType, alcoholRating, alcoholName, alcoholBrand, review, username, timestamp})
        .then(() => {
          this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          this.setState({ error });
        });
  
    };
  
    selectOnChange = (event, name) => {
      this.setState({ [name]: event[0].value });
    };

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

  
    render() {
      const { alcoholType, alcoholRating, review, alcoholName, alcoholBrand, error } = this.state;
  
      const isInvalid = alcoholType === '' || alcoholRating === '' || alcoholName === '' || alcoholBrand === '';
              
      return (
        <Form name="post-review-form" onSubmit={this.onSubmit}>
          <div className="select-container">
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
          </div>
          <Input 
            name="alcoholBrand"
            value={alcoholBrand}
            onChange={this.onChange}
            type="text"
            placeholder="Alcohol Brand" 
          />
          <Input 
            name="alcoholName"
            value={alcoholName}
            onChange={this.onChange}
            type="text"
            placeholder="Alcohol Name" 
          />
          <Input 
            name="review"
            value={review}
            onChange={this.onChange}
            type="text"
            multiline
            placeholder="Write your review here!" 
          />
          <div className="submit-button-container">
            <Button className="submit-button" disabled={isInvalid} type="submit">
              Submit Rating
            </Button>
          </div>
          {error && <p>{error.message}</p>}
        </Form>
      );
    }
  }

const condition = authUser => !!authUser;

const mapStatetoProps = (state) => ({
  user: selectUser(state),
})

const PostReviewForm = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition, ROUTES.SIGN_IN),
  connect(mapStatetoProps),
)(PostReviewFormBase);

export default PostReview;

export {PostReviewForm};