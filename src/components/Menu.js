import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Menu extends React.Component {
  render() {
    return (
      <Nav bsStyle="tabs">
        <NavItem href="/">Home</NavItem>
        <NavDropdown title="Categories" id="nav-dropdown">
          {this.props.categories && Object.keys(this.props.categories).map((categoryName, idx) => (
            <MenuItem key={idx} href={"/category/" + this.props.categories[categoryName].path}>{categoryName}</MenuItem>
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