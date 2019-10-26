import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {List, ListItem, Button, Select, SelectOption} from '@momentum-ui/react';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';
import { withFirebase } from '../Firebase';

const ViewReviews = () => (
    <div className="app-container">
      <h1 className="home-header"><Link to={ROUTES.HOME}>Whiskey Club</Link></h1>
      <div className="view-review-container">
        <ViewReviewForm />
      </div>
    </div>
);

const INITIAL_STATE = {
    alcoholType: '',
    queryResults: [],
};

class ViewReviewsFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = {...INITIAL_STATE};
    }
  
    onSubmit = event => {
      const { alcoholType } = this.state;
      this.props.firebase
        .fetchReviews(alcoholType)
        .then((results) => {
          this.setState({queryResults: results}, () => {
            console.log(this.state);
          });
        })
        .catch(error => {
          this.setState({error});
        });
  
      event.preventDefault();
    };
  
    renderReviewListItems = (results) => {
      console.log(results);
      const resultListItems = []

      results.forEach((result) => {
        resultListItems.push(<ListItem label={result.review} />);
      });

      console.log(resultListItems);

      return resultListItems;
    }

    selectOnChange = (event, name) => {
      this.setState({[name]: event[0].value});
    };
  
    render() {
      const {alcoholType, queryResults, error} = this.state;
      const isInvalid = alcoholType === '';
      
      console.log(this.state);

      return (
        <div>
          <div className="view-review">
            <Select className="view-review-dropdown-button" defaultValue="Filter Reviews By Alcohol" onSelect={(e) => this.selectOnChange(e, 'alcoholType')} >
              <SelectOption value='all' label='All' />
              <SelectOption value='whiskey' label='Whiskey' />
              <SelectOption value='vodka' label='Vodka'  />
              <SelectOption value='rum' label='Rum' />
              <SelectOption value='tequila' label='Tequila' />
              <SelectOption value='gin' label='Gin' />
              <SelectOption value='cordial' label='Cordial' />
            </Select>
            <Button disabled={isInvalid} onClick={this.onSubmit}>
              View Reviews
            </Button>

            {error && <p>{error.message}</p>}
          </div>
          <div>
            {queryResults &&
            <List focusFirst>
              {this.renderReviewListItems(queryResults)}
            </List>
            }
          </div>
        </div>
      );
    }
  }

const condition = authUser => !!authUser;

const ViewReviewForm = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition)
)(ViewReviewsFormBase);

export default ViewReviews;

export {ViewReviewForm};