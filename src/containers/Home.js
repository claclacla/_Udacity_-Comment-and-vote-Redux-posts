import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PostsList from '../components/PostsList';

class Home extends React.Component {
  render() {
    return (
      <div>
        <ul className="categories-names-list">
          {this.props.categories && Object.keys(this.props.categories).map((categoryName, idx) => (
            <li className="category-name" key={idx}><Link to={"/category/" + this.props.categories[categoryName].path}>{categoryName}</Link></li>
          ))}
        </ul>
        <div className="home-posts-list">
          <PostsList />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(Home)