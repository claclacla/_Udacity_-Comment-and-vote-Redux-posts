import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, PageHeader, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

import Post from '../dtos/Post'
import { getAsyncPost, addAsyncPost, updateAsyncPost } from '../actions/posts';

const INSERT = "insert";
const UPDATE = "update";

class PostEditor extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.match.params.postId !== undefined) {
      this.postId = this.props.match.params.postId;
      this.props.getPost(this.postId);
    }

    this.state = {
      view: INSERT,
      post: {
        title: "",
        author: "",
        category: "",
        body: ""
      },
      form: {
        validation: {
          fields: {
            title: null,
            author: null,
            category: null,
            body: null
          }
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.posts) {
      return;
    }

    let posts = nextProps.posts;

    if (posts && posts[this.postId]) {
      let post = posts[this.postId];
      this.setState({ view: UPDATE, post: post });
    }
  }

  updateTitle = (title) => {
    this.setState((prevState, props) => {
      return { post: Object.assign({}, prevState.post, { title }) };
    });
  }

  updateAuthor = (author) => {
    this.setState((prevState, props) => {
      return { post: Object.assign({}, prevState.post, { author }) };
    });
  }

  updateCategory = (category) => {
    this.setState((prevState, props) => {
      return { post: Object.assign({}, prevState.post, { category }) };
    });
  }

  updateBody = (body) => {
    this.setState((prevState, props) => {
      return { post: Object.assign({}, prevState.post, { body }) };
    });
  }

  setValidationState = (fieldName, validationState) => {
    this.setState((prevState, props) => {
      return {
        form: {
          validation: {
            fields: Object.assign({}, prevState.form.validation.fields, { [fieldName]: validationState })
          }
        }
      }
    });
  }

  savePost = () => {
    let title = this.state.post.title;
    let category = this.state.post.category;
    let author = this.state.post.author;
    let body = this.state.post.body;
    let error = false;

    if (this.state.view === INSERT && !category) {
      this.setValidationState("category", "error");
      error = true;
    }

    if (this.state.view === INSERT && !author) {
      this.setValidationState("author", "error");
      error = true;
    }

    if (!title) {
      this.setValidationState("title", "error");
      error = true;
    }

    if (!body) {
      this.setValidationState("body", "error");
      error = true;
    }

    if (error) {
      return;
    }

    if (this.state.view === INSERT) {
      var post = new Post(title);

      if (author) {
        post.author = author;
      }

      if (category) {
        post.category = category;
      }

      if (body) {
        post.body = body;
      }

      this.props.addPost(post);
      this.setState({ view: UPDATE });
    }
    else {
      this.props.updatePost(this.state.post);
    }

    this.props.history.goBack();
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <PageHeader>Post editor</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <form onSubmit={this.handleSubmit}>

              <FormGroup validationState={this.state.form.validation.fields.title}>
                <ControlLabel>Title</ControlLabel>
                <FormControl type="text" placeholder="Title" onKeyDown={() => {this.setValidationState("title", null)}} onChange={(event) => this.updateTitle(event.target.value)} value={this.state.post.title} />
              </FormGroup>

              <FormGroup validationState={this.state.form.validation.fields.author}>
                <ControlLabel>Author</ControlLabel>
                <br />
                {this.state.view === INSERT && <FormControl type="text" placeholder="Author"  onKeyDown={() => {this.setValidationState("author", null)}} onChange={(event) => this.updateAuthor(event.target.value)} value={this.state.post.author} />}
                {this.state.view === UPDATE && this.state.post.author}
              </FormGroup>

              <FormGroup validationState={this.state.form.validation.fields.category}>
                <ControlLabel>Category</ControlLabel>
                <br />
                {this.state.view === INSERT &&
                  <FormControl componentClass="select" placeholder="Category" value={this.state.post.category} onChange={(event) => {this.setValidationState("category", null); this.updateCategory(event.target.value)}}>
                    <option></option>
                    {this.props.categories && Object.values(this.props.categories).map(
                      (category, idx) => (<option value={category.name} key={idx}>{category.name}</option>)
                    )}
                  </FormControl>
                }
                {this.state.view === UPDATE && this.state.post.category}
              </FormGroup>

              <FormGroup validationState={this.state.form.validation.fields.body}>
                <ControlLabel>Body</ControlLabel>
                <FormControl componentClass="textarea" value={this.state.post.body} onKeyDown={() => {this.setValidationState("body", null)}} onChange={(event) => this.updateBody(event.target.value)} />
              </FormGroup>
              <br />
              <Button bsStyle="primary" onClick={this.savePost}>Save</Button>
            </form>
          </Col>
        </Row>
      </Grid >
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => dispatch(getAsyncPost(id)),
    addPost: (post) => dispatch(addAsyncPost(post)),
    updatePost: (post) => dispatch(updateAsyncPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEditor);