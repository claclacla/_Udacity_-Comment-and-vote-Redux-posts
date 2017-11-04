import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

  savePost = () => {
    if (this.state.view === INSERT) {
      var post = new Post(this.state.post.title);

      if (this.state.post.author) {
        post.author = this.state.post.author;
      }

      if (this.state.post.category) {
        post.category = this.state.post.category;
      }

      if (this.state.post.body) {
        post.body = this.state.post.body;
      }

      this.props.addPost(post);
      this.setState({ view: UPDATE });
    }
    else {
      this.props.updatePost(this.state.post);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <b>Insert a new post:</b>
        <form onSubmit={this.handleSubmit}>
          Title<br />
          <input type="text" onChange={(event) => this.updateTitle(event.target.value)} value={this.state.post.title} /><br />

          Author<br />
          {this.state.view === INSERT && <input type="text" onChange={(event) => this.updateAuthor(event.target.value)} value={this.state.post.author} />}
          {this.state.view === UPDATE && this.state.post.author}
          <br />

          Category <br />
          {this.state.view === INSERT && <select value={this.state.post.category} onChange={(event) => this.updateCategory(event.target.value)}>
            <option></option>
            {this.props.categories && Object.values(this.props.categories).map(
              (category, idx) => (<option value={category.name} key={idx}>{category.name}</option>)
            )}
          </select>}
          {this.state.view === UPDATE && this.state.post.category}
          <br />

          Body<br />
          <textarea value={this.state.post.body} onChange={(event) => this.updateBody(event.target.value)} />
          <br />
          <button onClick={this.savePost}>Add</button>
        </form>

        <Link to="/">Go to home</Link>
      </div>
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