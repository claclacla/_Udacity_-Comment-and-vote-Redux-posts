import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAsyncCategories } from '../actions/categories';

import Menu from '../components/Menu';
import Home from './Home';
import PostCategory from './PostCategory';
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
        <Route exact path="/" component={Home}></Route>
        <Route path="/category/:categoryName" component={PostCategory}></Route>
        <Route path="/post/:postId" component={PostDetail}></Route>
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
