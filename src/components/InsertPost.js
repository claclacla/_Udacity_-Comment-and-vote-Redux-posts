import React from 'react';
import { connect } from 'react-redux';

import Post from '../dtos/Post'
import { addAsyncPost } from '../actions/posts';

class InsertPost extends React.Component {
  state = {
    title: ""
  };

  updateTitle = (title) => {
    this.setState({ title });
  }

  addPost = () => {
    var post = new Post(this.state.title);
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
          <input type="text" onChange={(event) => this.updateTitle(event.target.value)} value={this.state.title} />
          <button onClick={this.addPost}>Add</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addAsyncPost(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(InsertPost);