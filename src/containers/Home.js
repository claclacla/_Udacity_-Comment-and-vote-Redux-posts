import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <div>
      <ul className="categories-names-list">
        {this.props.categories && this.props.categories.map((category, idx) => (
          <li className="category-name" key={idx}><Link to={"/category/" + category.path}>{category.name}</Link></li>
        ))} 
      </ul>
      <Link to="/category/react">REACT</Link>
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