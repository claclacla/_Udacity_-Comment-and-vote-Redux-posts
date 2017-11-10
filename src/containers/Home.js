import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import PostsList from '../components/PostsList';

class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <PostsList />
            <Button bsStyle="primary" href="/post-editor">Add a new post</Button>
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