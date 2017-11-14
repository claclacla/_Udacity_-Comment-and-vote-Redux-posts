import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, PageHeader, Table, Button, Badge, Glyphicon } from 'react-bootstrap';

import { UP_VOTE, DOWN_VOTE } from '../data';
import { parseTimestamp } from '../lib/date';
import CommentsList from '../components/CommentsList';
import CommentEditor from '../components/CommentEditor';
import { getAsyncPost, updateAsyncPostVote, deleteAsyncPost } from '../actions/posts';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.postId = this.props.match.params.postId;
    this.props.getPost(this.postId);

    this.state = {
      post: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      let posts = nextProps.posts;

      if (posts && posts[this.postId]) {
        let post = Object.assign({}, posts[this.postId]);
        post.date = parseTimestamp(post.timestamp);
        this.setState({ post });
      }
    }
  }

  deletePost() {
    this.props.deletePost(this.postId);
    this.props.history.push("/");
  }

  render() {
    const { post } = this.state;

    if (!post.hasOwnProperty("id")) {
      return (
        <Grid>
          <Row>
            <Col mdOffset={4} md={4}>
              <h1>404 Page not found</h1>
            </Col>
          </Row>
        </Grid >
      )
    }

    return (
      <Grid>
        <Row>
          <Col md={12}>
            <PageHeader>
              Post detail
              &nbsp;
              <Badge>{post.voteScore}</Badge>
              &nbsp;
              <Button onClick={() => this.props.votePost(post.id, UP_VOTE)} bsSize="xsmall"><Glyphicon glyph="plus" /></Button>
              &nbsp;
              <Button onClick={() => this.props.votePost(post.id, DOWN_VOTE)} bsSize="xsmall"><Glyphicon glyph="minus" /></Button>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            <Table>
              <tbody>
                <tr>
                  <td><b>Date</b></td>
                  <td> {post.date}</td>
                </tr>
                <tr>
                  <td><b>Vote score</b></td>
                  <td> {post.voteScore}</td>
                </tr>
                <tr>
                  <td><b>Title</b></td>
                  <td> {post.title}</td>
                </tr>
                <tr>
                  <td><b>Author</b></td>
                  <td> {post.author}</td>
                </tr>
                <tr>
                  <td><b>Category</b></td>
                  <td> {post.category}</td>
                </tr>
                <tr>
                  <td>
                    <b>Body</b>
                    <br /><br />
                    {post.body}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={2}>
            <LinkContainer to={"/post-editor/" + this.postId}>
              <Button bsStyle="primary">Edit</Button>
            </LinkContainer>
            &nbsp;
            <Button bsStyle="danger" onClick={() => this.deletePost()}>Delete</Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CommentsList postId={this.postId} />
            <CommentEditor postId={this.postId} />
          </Col>
        </Row>
      </Grid >
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
    getPost: (id) => dispatch(getAsyncPost(id)),
    votePost: (id, vote) => dispatch(updateAsyncPostVote(id, vote)),
    deletePost: (id) => dispatch(deleteAsyncPost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)