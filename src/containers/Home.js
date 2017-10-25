import React from 'react';
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
        <li className="category-name">Category1</li>
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