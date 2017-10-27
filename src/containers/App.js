import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import ProductCategory from './ProductCategory';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home}></Route>
        <Route path="/category/:categoryPath" component={ProductCategory}></Route>
      </div>
    );
  }
}

export default App;
