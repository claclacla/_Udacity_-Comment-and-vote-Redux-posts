import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAsyncPosts } from '../actions/posts';

class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.props.getPosts();
  }

  static propTypes = {
    category: PropTypes.string
  }

  render() {
    let posts = [];

    if(this.props.posts) {
      posts = Object.values(this.props.posts);

      if(this.props.category) {
        posts = posts.filter(post => post.category === this.props.category);
      }
    }

    return (
      <ul className="posts-list">
        {posts.map((post, idx) => (
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