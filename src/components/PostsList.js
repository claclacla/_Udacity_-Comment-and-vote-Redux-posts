import React from 'react';
import { connect } from 'react-redux';

import { getAsyncPosts } from '../actions/posts';

class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.props.getPosts();
  }

  render() {
    return (
      <ul className="posts-list">
        {this.props.posts && Object.values(this.props.posts).map((post, idx) => (
          <li key={idx}>{post.title}</li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(getAsyncPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)