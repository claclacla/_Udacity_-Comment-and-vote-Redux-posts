import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductCategory extends React.Component {
  render() {
    const categoryName = this.props.match.params.categoryName;

    return (
      <div>
        <h1>{categoryName}</h1>
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
) (ProductCategory)