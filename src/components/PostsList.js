import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, FormGroup, FormControl, ControlLabel, Glyphicon, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { UP_VOTE, DOWN_VOTE } from '../data';
import { sortByField } from '../lib/sort';
import { getAsyncPosts, updateAsyncPostVote, deleteAsyncPost } from '../actions/posts';

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

  deletePost(id) {
    this.props.deletePost(id);
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
              return (
                <tr key={idx}>
                  <td style={titleStyle}>
                    <Link to={"/post/" + post.id}>{post.title}</Link> - {post.author}
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
                    <Badge>{post.commentCount}</Badge>
                  </td>
                  <td>
                    <LinkContainer to={"/post-editor/" + post.id}>
                      <Button bsStyle="primary">Edit</Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button bsStyle="danger" onClick={() => this.deletePost(post.id)}>Delete</Button>
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

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (id, vote) => dispatch(updateAsyncPostVote(id, vote)),
    getPosts: () => dispatch(getAsyncPosts()),
    deletePost: (id) => dispatch(deleteAsyncPost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)