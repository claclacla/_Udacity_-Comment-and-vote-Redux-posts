import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from '../dtos/Post'
import { addAsyncPost } from '../actions/posts';

class InsertPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    }

    if (props.category) {
      this.state = {
        category: props.category
      };
    }
  }

  static propTypes = {
    category: PropTypes.string
  }

  updateTitle = (title) => {
    this.setState({ title });
  }

  updateAuthor = (author) => {
    this.setState({ author });
  }

  updateCategory = (category) => {
    this.setState({ category });
  }

  updateBody = (body) => {
    this.setState({ body });
  }

  addPost = () => {
    var post = new Post(this.state.title);

    if (this.state.author) {
      post.author = this.state.author;
    }

    if (this.state.category) {
      post.category = this.state.category;
    }

    if (this.state.body) {
      post.body = this.state.body;
    }

    this.props.addPost(post);
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
          <input type="text" onChange={(event) => this.updateTitle(event.target.value)} value={this.state.title} /><br />
          Author<br />
          <input type="text" onChange={(event) => this.updateAuthor(event.target.value)} value={this.state.author} /><br />

          Category < br />
          {!this.props.category && <div>
            <select value={this.state.category} onChange={(event) => this.updateCategory(event.target.value)}>
              <option></option>
              {this.props.categories && Object.values(this.props.categories).map(
                (category, idx) => (<option value={category.name} key={idx}>{category.name}</option>)
              )}
            </select></div>}
          {this.props.category && <div>{this.props.category}</div>}

          <br />
          Body<br />
          <textarea value={this.state.body} onChange={(event) => this.updateBody(event.target.value)} />
          <br />
          <button onClick={this.addPost}>Add</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addAsyncPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertPost);