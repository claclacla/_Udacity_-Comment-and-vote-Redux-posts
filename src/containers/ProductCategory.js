import React from 'react';
import { Link } from 'react-router-dom';

class ProductCategory extends React.Component {
  render() {
    const categoryPath = this.props.match.params.categoryPath;

    return (
      <div>
        <h1>{categoryPath}</h1>
        <Link to="/">Go to home</Link>
      </div>
    );
  }
}

export default ProductCategory