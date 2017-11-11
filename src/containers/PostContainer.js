import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';

import PostsList from '../components/PostsList';

class PostContainer extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    categoryName: PropTypes.string
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <PageHeader>{this.props.title}</PageHeader>
            <PostsList category={this.props.categoryName} />
            <LinkContainer to="/post-editor">
              <Button bsStyle="primary">Add a new post</Button>
            </LinkContainer>
          </Col>
        </Row>
      </Grid>
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
)(PostContainer)