import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAsyncPost } from '../actions/posts';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.postId = this.props.match.params.postId;
    this.props.getPost(this.postId);
  }

  render() {
    let post = {};

    if (this.props.posts && this.props.posts[this.postId]) {
      post = this.props.posts[this.postId];
    }

    return (
      <div>
        <h1>Post detail</h1>

        <div><b>Title</b> {post.title}</div>
        <div><b>Author</b> {post.author}</div>
        <div><b>Category</b> {post.category}</div>
        <div>
          <b>Body</b> 
          <br /><br />
          {post.body}
        </div>

        <Link to="/">Go to home</Link>
      </div>
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
    getPost: (id) => dispatch(getAsyncPost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)