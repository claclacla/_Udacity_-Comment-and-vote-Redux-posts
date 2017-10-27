import React from 'react';

class ProductCategory extends React.Component {
  render() {
    console.log(this.props.match.params.categoryPath);
    return (
      <div>hi</div>
    );
  }
}

export default ProductCategory