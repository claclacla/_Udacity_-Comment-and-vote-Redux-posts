import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAsyncCategories } from '../actions/categories';

import Menu from '../components/Menu';
import PostContainer from './PostContainer';
import PostDetail from './PostDetail';
import PostEditor from './PostEditor';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getCategories();
  }

  render() {
    return (
      <div className="App">
        <Menu />
        <Route exact path="/" render={(routeProps) => {
          return (
            <PostContainer title="React, Redux or Udacity" />
          );
        }} />
        <Route exact path="/:categoryName" render={(routeProps) => {
          return (
            <PostContainer title={routeProps.match.params.categoryName} categoryName={routeProps.match.params.categoryName} />
          );
        }} />
        <Route path="/:categoryName/:postId" component={PostDetail}></Route>
        <Route path="/post-editor/:postId?" component={PostEditor}></Route>
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
