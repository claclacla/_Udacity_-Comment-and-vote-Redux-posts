import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateAsyncComment, getAsyncComments, deleteAsyncComment } from '../actions/comments'

class CommentsList extends React.Component {
  constructor(props) {
    super(props);

    this.props.getComments(this.props.postId);

    this.state = {
      comments: []
    }
  }

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments) {
      let comments = [];

      if (nextProps.comments[this.props.postId] !== undefined) {
        comments = nextProps.comments[this.props.postId];

        this.setState({ comments });
      }
    }
  }

  updateBody = (idx, body) => {
    this.setState((prevState, props) => {
      let currentComment = prevState.comments[idx];
      currentComment.body = body;
      return { comments: prevState.comments };
    });
  }

  editComment(idx) {
    let comment = document.getElementsByClassName("comment")[idx];

    let commentBody = comment.getElementsByClassName("body")[0];
    commentBody.style.display = "none";
    let editableBody = comment.getElementsByClassName("editable-body")[0];
    editableBody.style.display = "block";
    let editComment = comment.getElementsByClassName("edit-comment")[0];
    editComment.style.display = "none";
    let deleteComment = comment.getElementsByClassName("delete-comment")[0];
    deleteComment.style.display = "none";
    let saveComment = comment.getElementsByClassName("save-comment")[0];
    saveComment.style.display = "inline";
    let cancelCommentEdit = comment.getElementsByClassName("cancel-comment-edit")[0];
    cancelCommentEdit.style.display = "inline";
  }

  closeCommentEdit(idx) {
    let comment = document.getElementsByClassName("comment")[idx];

    let commentBody = comment.getElementsByClassName("body")[0];
    commentBody.style.display = "block";
    let editableBody = comment.getElementsByClassName("editable-body")[0];
    editableBody.style.display = "none";
    let editComment = comment.getElementsByClassName("edit-comment")[0];
    editComment.style.display = "inline";
    let deleteComment = comment.getElementsByClassName("delete-comment")[0];
    deleteComment.style.display = "inline";
    let saveComment = comment.getElementsByClassName("save-comment")[0];
    saveComment.style.display = "none";
    let cancelCommentEdit = comment.getElementsByClassName("cancel-comment-edit")[0];
    cancelCommentEdit.style.display = "none";
  }

  saveComment(idx) {
    this.props.updateComment(this.state.comments[idx]);
    this.closeCommentEdit(idx);
  }

  render() {
    const { comments } = this.state;
    const displayNone = {display: "none"};

    return (
      <div>
        <b>Comments</b>
        <br />
        <ul className="comments-list">
          {comments && comments.map((comment, idx) => (
            <li className="comment" key={idx}>
              Name: {comment.author}
              <div>Comment:
                <span className="body">{comment.body}</span>
                <div className="editable-body" style={displayNone}>
                  <textarea value={this.state.comments[idx].body} onChange={(event) => this.updateBody(idx, event.target.value)} />
                </div>
              </div>
              <button className="edit-comment" onClick={() => this.editComment(idx)}>Edit</button>
              <button className="delete-comment" onClick={() => this.props.deleteComment(this.props.postId, comment.id)}>Delete</button>
              <button className="save-comment" style={displayNone} onClick={() => this.saveComment(idx)}>Save</button>
              <button className="cancel-comment-edit" style={displayNone} onClick={() => this.closeCommentEdit(idx)}>Cancel</button>
            </li>
          ))}
        </ul>
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
    getComments: (postId) => dispatch(getAsyncComments(postId)),
    updateComment: (comment) => dispatch(updateAsyncComment(comment)),
    deleteComment: (postId, id) => dispatch(deleteAsyncComment(postId, id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList)