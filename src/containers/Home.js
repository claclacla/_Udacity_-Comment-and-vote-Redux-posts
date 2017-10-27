import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAsyncCategories } from '../actions/category';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.props.getCategories();
  }

  render() {
    return (
      <ul className="categories-names-list">
        <li className="category-name"><Link to="/category/react">React</Link></li>
        <li className="category-name">Category2</li>
      </ul>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getAsyncCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)