import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, FormGroup, FormControl, ControlLabel, Glyphicon, Button, Badge } from 'react-bootstrap';

import { UP_VOTE, DOWN_VOTE } from '../data';
import { sortByField } from '../lib/sort';
import { getAsyncPosts, updateAsyncPostVote } from '../actions/posts';

const SORT_BY_VOTE_SCORE = "voteScore";
const SORT_BY_TIMESTAMP = "timestamp";

class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postsSort: SORT_BY_VOTE_SCORE
    }

    this.props.getPosts();
  }

  static propTypes = {
    category: PropTypes.string
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      this.setState({ posts: sortByField(Object.values(nextProps.posts), SORT_BY_VOTE_SCORE) });
    }
  }

  updateSort(field) {
    this.setState({
      postsSort: field,
      posts: sortByField(this.state.posts, field)
    });
  }

  render() {
    let posts = [];
    let titleStyle = {
      width: "80%"
    };

    if (this.state.posts) {
      posts = this.state.posts;

      if (this.props.category) {
        posts = posts.filter(post => post.category === this.props.category);
      }
    }

    return (
      <div>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Order</ControlLabel>
          <FormControl componentClass="select" value={this.state.postsSort} onChange={(event) => this.updateSort(event.target.value)}>
            <option value={SORT_BY_VOTE_SCORE}>{SORT_BY_VOTE_SCORE}</option>
            <option value={SORT_BY_TIMESTAMP}>{SORT_BY_TIMESTAMP}</option>
          </FormControl>
        </FormGroup>

        <Table striped hover>
          <tbody>
            {posts.map((post, idx) => {
              let commentsNumber = 0;

              if (this.props.comments[post.id]) {
                commentsNumber = this.props.comments[post.id].length;
              }

              return (
                <tr key={idx}>
                  <td style={titleStyle}>
                    <Link to={"/post/" + post.id}>{post.title}</Link>
                  </td>
                  <td>
                    Score
                  </td>
                  <td>
                    <Badge>{post.voteScore}</Badge>
                  </td>
                  <td>
                    <Button onClick={() => this.props.votePost(post.id, UP_VOTE)} bsSize="xsmall"><Glyphicon glyph="plus" /></Button>
                  </td>
                  <td>
                    <Button onClick={() => this.props.votePost(post.id, DOWN_VOTE)} bsSize="xsmall"><Glyphicon glyph="minus" /></Button>
                  </td>
                  <td>
                    Comments
                  </td>
                  <td>
                    <Badge>{commentsNumber}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
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
    votePost: (id, vote) => dispatch(updateAsyncPostVote(id, vote)),
    getPosts: () => dispatch(getAsyncPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)