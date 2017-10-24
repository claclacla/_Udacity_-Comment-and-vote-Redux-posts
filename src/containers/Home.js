import React from 'react';

import CategoryRESTRepository from '../repositories/REST/CategoryRESTRepository';

class Home extends React.Component {
  render() {
    var categoryRESTRepository = new CategoryRESTRepository();
    categoryRESTRepository.get();

    return (
      <ul className="categories-names-list">
        <li className="category-name">Category1</li>
        <li className="category-name">Category2</li>
      </ul>
    )
  }
}

export default Home