import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAsyncComments } from '../actions/comments'

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

  render() {
    const { comments } = this.state;

    return (
      <div>
        <b>Comments</b>
        <br />
        <ul className="comments-list">
          {comments && comments.map((comment, idx) => (
            <li className="comment" key={idx}>{comment.body}</li>
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
    getComments: (id) => dispatch(getAsyncComments(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList)