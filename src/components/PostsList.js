import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAsyncPosts } from '../actions/posts';

function sortPosts(posts, field) {
  if(!posts) {
    return posts;
  }

  posts = posts.sort((a, b) => a[field] < b[field]);

  return posts;
}

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
      posts = this.props.posts;

      if(this.props.category) {
        posts = posts.filter(post => post.category === this.props.category);
      }
    }

    return (
      <ul className="posts-list">
        {posts.map((post, idx) => (
          <li key={idx}><Link to={"/post/" + post.id}>{post.title} (score: {post.voteScore})</Link></li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: sortPosts(Object.values(posts), "voteScore")
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