import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import PostsList from '../components/PostsList';

class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <PostsList />
            <Link to="/post-editor">Add a new post</Link>
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