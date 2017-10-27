import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { getAsyncCategories } from '../actions/category';

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
        <Route path="/category/:categoryPath" component={ProductCategory}></Route>
      </div>
    );
  }
}

function mapStateToProps({categories}) {
  return {
    categories: categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getAsyncCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
