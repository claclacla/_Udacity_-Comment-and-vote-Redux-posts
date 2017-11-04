import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CommentEditor from '../components/CommentEditor';
import { getAsyncPost, deleteAsyncPost } from '../actions/posts';
import { getAsyncComments } from '../actions/comments';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.postId = this.props.match.params.postId;
    this.props.getPost(this.postId);
    this.props.getComments(this.postId);

    this.state = {
      post: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      let posts = nextProps.posts;

      if (posts && posts[this.postId]) {
        let post = Object.assign({}, posts[this.postId]);

        let getTimeDataString = function (timeData) {
          let timeDataString = timeData.toString();

          if (timeDataString.length === 1) {
            timeDataString = "0" + timeDataString;
          }
          return timeDataString;
        };

        let timestamp = new Date(post.timestamp);
        let timestampString = getTimeDataString(timestamp.getHours());
        timestampString += ":" + getTimeDataString(timestamp.getMinutes());
        timestampString += " " + getTimeDataString(timestamp.getDate());
        timestampString += "/" + getTimeDataString(timestamp.getMonth());
        timestampString += "/" + timestamp.getFullYear();

        post.timestamp = timestampString;

        this.setState({ post });
      }
    }

    if (nextProps.comments) {
      let comments = [];

      if (nextProps.comments[this.postId] !== undefined) {
        comments = nextProps.comments[this.postId];

        this.setState({ comments });
      }
    }
  }

  deletePost() {
    this.props.deletePost(this.postId);
    this.props.history.push("/");
  }

  render() {
    const { post, comments } = this.state;

    return (
      <div>
        <h1>Post detail</h1>
        <div>
          <Link to={"/post-editor/" + this.postId}>Edit</Link>
          &nbsp;
          <button onClick={() => this.deletePost()}>Delete</button>
        </div>
        <br />

        <div><b>Date</b> {post.timestamp}</div>
        <div><b>Vote score</b> {post.voteScore}</div>
        <div><b>Title</b> {post.title}</div>
        <div><b>Author</b> {post.author}</div>
        <div><b>Category</b> {post.category}</div>
        <div>
          <b>Body</b>
          <br /><br />
          {post.body}
        </div>

        <div>
          <b>Comments</b>
          <br />
          <ul className="comments-list">
          {comments && comments.map((comment, idx) => (
            <li className="comment" key={idx}>{comment.body}</li>
          ))}
          </ul>
          <br />
          <CommentEditor postId={this.postId}/>
        </div>

        <Link to="/">Go to home</Link>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => dispatch(getAsyncPost(id)),
    deletePost: (id) => dispatch(deleteAsyncPost(id)),
    getComments: (id) => dispatch(getAsyncComments(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)