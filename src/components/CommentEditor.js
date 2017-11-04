import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Comment from '../dtos/Comment';
import { addAsyncComment } from '../actions/comments';

class CommentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        parentId: props.postId,
        author: "",
        body: ""
      }
    }
  }

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  updateAuthor = (author) => {
    this.setState((prevState, props) => {
      return { comment: Object.assign({}, prevState.comment, { author }) };
    });
  }

  updateBody = (body) => {
    this.setState((prevState, props) => {
      return { comment: Object.assign({}, prevState.comment, { body }) };
    });
  }

  saveComment = () => {
    let author = this.state.comment.author;
    let body = this.state.comment.body;

    let comment = new Comment(author, body, this.state.comment.parentId);
    this.props.addComment(comment);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        Add a new comment
      <form onSubmit={this.handleSubmit}>
          Author<br />
          <input type="text" onChange={(event) => this.updateAuthor(event.target.value)} value={this.state.comment.author} />
          Body<br />
          <textarea value={this.state.comment.body} onChange={(event) => this.updateBody(event.target.value)} />
          <br />
          <button onClick={this.saveComment}>Save</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(addAsyncComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentEditor)