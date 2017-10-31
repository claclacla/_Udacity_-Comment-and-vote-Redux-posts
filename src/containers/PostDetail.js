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
    let timestampString = "";

    if (this.props.posts && this.props.posts[this.postId]) {
      post = this.props.posts[this.postId];

      let getTimeDataString = function (timeData) {
        let timeDataString = timeData.toString();

        if (timeDataString.length === 1) {
          timeDataString = "0" + timeDataString;
        }
        return timeDataString;
      };

      let timestamp = new Date(post.timestamp);
      timestampString = getTimeDataString(timestamp.getHours());
      timestampString += ":" + getTimeDataString(timestamp.getMinutes());
      timestampString += " " + getTimeDataString(timestamp.getDate());
      timestampString += "/" + getTimeDataString(timestamp.getMonth());
      timestampString += "/" + timestamp.getFullYear();
    }

    return (
      <div>
        <h1>Post detail</h1>
        <div>
          <span>Edit</span>
          &nbsp;
          <span>Delete</span>
        </div>
        <br />

        <div><b>Date</b> {timestampString}</div>
        <div><b>Vote score</b> {post.voteScore}</div>
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