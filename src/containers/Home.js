import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <ul className="categories-names-list">
        <li className="category-name"><Link to="/category/react">React</Link></li>
        <li className="category-name">Category2</li>
      </ul>
    )
  }
}

export default Home