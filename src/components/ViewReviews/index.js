import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {List, Select, SelectOption} from '@momentum-ui/react';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';
import { withFirebase } from '../Firebase';
import ReviewItem from '../ReviewItem';


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
    loading: false,
};

class ViewReviewsFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = {...INITIAL_STATE};
    }

    componentDidMount() {
      this.setState({ loading: true });

      this.props.firebase.fetchReviewsRef().on('value', snapshot => {
        const allResultsObject = snapshot.val();
        const results = {};
        Object.keys(allResultsObject).map(key => {
          results[key] = [];
          Object.values(allResultsObject[key]).map(value => {
            return results[key].push(value)
          }) 
          return results; 
        });

        this.setState({queryResults: results, loading: false});
      });
      
    }
  
    renderReviewListItems = (alcoholType, results) => {
      const resultListItems = []

      if(!results || (alcoholType !== '' && alcoholType !== 'all' && !results[alcoholType])) {
        return null;
      }

      if(!alcoholType || alcoholType === 'all') {
        Object.keys(results).map(key => (
          Object.values(results[key]).map(value => (
            resultListItems.push(<ReviewItem reviewName={'John'} reviewRating={value.alcoholRating} reviewDetails={value.review} />)
          ))
        ))
      } else {
        results[alcoholType].map(value => resultListItems.push(<ReviewItem reviewName={'John'} reviewRating={value.alcoholRating} reviewDetails={value.review} />))
      }

      return resultListItems;
    }

    selectOnChange = (event, name) => {
      this.setState({[name]: event[0].value});
    };
  
    render() {
      const {alcoholType, queryResults} = this.state;

      return (
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
        
              {queryResults &&
              <List>
                {this.renderReviewListItems(alcoholType, queryResults)}
              </List>
              }
          
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