import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductCategory extends React.Component {
  render() {
    const categoryPath = this.props.match.params.categoryPath;
    let categoryName = "";
    
    if(this.props.categories) {
      categoryName = this.props.categories.find(category => category.path === categoryPath).name;
    }

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