import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Menu = function(props) {
    return (
      <Nav bsStyle="tabs">
        <LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer>
        <NavDropdown title="Categories" id="nav-dropdown">
          {props.categories && Object.keys(props.categories).map((categoryName, idx) => (
            <LinkContainer key={idx} to={"/" + props.categories[categoryName].path}><MenuItem>{categoryName}</MenuItem></LinkContainer>
          ))}
        </NavDropdown>
      </Nav>
    );
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(Menu)