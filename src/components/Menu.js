import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Menu extends React.Component {
  render() {
    return (
      <Nav bsStyle="tabs">
        <LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer>
        <NavDropdown title="Categories" id="nav-dropdown">
          {this.props.categories && Object.keys(this.props.categories).map((categoryName, idx) => (
            <LinkContainer key={idx} to={"/category/" + this.props.categories[categoryName].path}><MenuItem>{categoryName}</MenuItem></LinkContainer>
          ))}
        </NavDropdown>
      </Nav>
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
)(Menu)