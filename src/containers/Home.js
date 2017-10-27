import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAsyncPosts } from '../actions/posts';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.props.getPosts();
  }

  render() {
    return (
      <ul className="categories-names-list">
        {this.props.categories && Object.keys(this.props.categories).map((categoryName, idx) => (
          <li className="category-name" key={idx}><Link to={"/category/" + this.props.categories[categoryName].path}>{categoryName}</Link></li>
        ))} 
      </ul>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(getAsyncPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)