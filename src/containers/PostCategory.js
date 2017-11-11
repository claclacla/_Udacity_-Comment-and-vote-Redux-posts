import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';

import PostsList from '../components/PostsList';

class PostCategory extends React.Component {
  constructor(props) {
    super(props);

    this.categoryName = this.props.match.params.categoryName;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <PageHeader>{this.categoryName}</PageHeader>
            <PostsList category={this.categoryName} />
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
)(PostCategory)