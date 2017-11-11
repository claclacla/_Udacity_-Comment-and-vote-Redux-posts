import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Badge, Button, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';

import { parseTimestamp } from '../lib/date';
import { UP_VOTE, DOWN_VOTE } from '../data';
import { sortByField } from '../lib/sort';
import { updateAsyncComment, getAsyncComments, deleteAsyncComment, updateAsyncPostVote } from '../actions/comments'

const SORT_BY_VOTE_SCORE = "voteScore";

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
        comments = sortByField(nextProps.comments[this.props.postId], SORT_BY_VOTE_SCORE);

        comments.map(comment => {
          comment.date = parseTimestamp(comment.timestamp);
          return comment;
        });

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
    const displayNone = { display: "none" };

    return (
      <div>
        <h3>Comments</h3>
        <br />
        <Table hover striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th></th>
              <th>Comment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {comments && comments.map((comment, idx) => (
              <tr className="comment" key={idx}>
                <td>
                  {comment.date}
                </td>
                <td>
                  {comment.author}
                </td>
                <td>
                  Score
                  &nbsp;
                  <Badge>{comment.voteScore}</Badge>
                  &nbsp;
                  <Button onClick={() => this.props.voteComment(this.props.postId, comment.id, UP_VOTE)} bsSize="xsmall"><Glyphicon glyph="plus" /></Button>
                  &nbsp;
                  <Button onClick={() => this.props.voteComment(this.props.postId, comment.id, DOWN_VOTE)} bsSize="xsmall"><Glyphicon glyph="minus" /></Button>
                </td>
                <td>
                  <span className="body">{comment.body}</span>
                  <div className="editable-body" style={displayNone}>
                    <FormGroup controlId="formControlsTextarea">
                      <FormControl componentClass="textarea" value={this.state.comments[idx].body} onChange={(event) => this.updateBody(idx, event.target.value)} />
                    </FormGroup>
                  </div>
                </td>
                <td>
                  <Button className="edit-comment" bsStyle="primary" onClick={() => this.editComment(idx)}>Edit</Button>
                  &nbsp;
                  <Button className="delete-comment" bsStyle="danger" onClick={() => this.props.deleteComment(this.props.postId, comment.id)}>Delete</Button>
                  <Button className="save-comment" bsStyle="primary" style={displayNone} onClick={() => this.saveComment(idx)}>Save</Button>
                  &nbsp;
                  <Button className="cancel-comment-edit" style={displayNone} onClick={() => this.closeCommentEdit(idx)}>Cancel</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
    deleteComment: (postId, id) => dispatch(deleteAsyncComment(postId, id)),
    voteComment: (postId, id, vote) => dispatch(updateAsyncPostVote(postId, id, vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList)