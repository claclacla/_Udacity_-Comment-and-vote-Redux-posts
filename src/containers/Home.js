import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import PostsList from '../components/PostsList';

class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <PostsList />
            <LinkContainer to="/post-editor">
              <Button bsStyle="primary">Add a new post</Button>
            </LinkContainer>
          </Col>
        </Row>
      </Grid>
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