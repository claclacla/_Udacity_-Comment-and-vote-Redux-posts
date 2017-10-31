import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostsList from '../components/PostsList';

class PostCategory extends React.Component {
  constructor(props) {
    super(props);

    this.categoryName = this.props.match.params.categoryName;
  }

  render() {
    return (
      <div>
        <h1>{this.categoryName}</h1>
        <PostsList category={this.categoryName} />
        <Link to="/post-editor">Add a new post</Link>
        <br />
        <Link to="/">Go to home</Link>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(PostCategory)