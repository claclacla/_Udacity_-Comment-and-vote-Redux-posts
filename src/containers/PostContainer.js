import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';

import PostsList from '../components/PostsList';

const PostContainer = function (props) {
  return (
    <Grid>
      <Row>
        <Col md={12}>
          <PageHeader>{props.title}</PageHeader>
          <PostsList category={props.categoryName} />
          <LinkContainer to="/post-editor">
            <Button bsStyle="primary">Add a new post</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Grid>
  );
}

PostContainer.propTypes = {
  title: PropTypes.string.isRequired,
  categoryName: PropTypes.string
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(PostContainer)