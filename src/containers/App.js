import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { getAsyncCategories } from '../actions/categories';

import Home from './Home';
import ProductCategory from './ProductCategory';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getCategories();
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home}></Route>
        <Route path="/category/:categoryName" component={ProductCategory}></Route>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getAsyncCategories())
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App));
