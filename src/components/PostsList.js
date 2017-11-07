import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sortByField } from '../lib/sort';
import { getAsyncPosts } from '../actions/posts';

const SORT_BY_VOTE_SCORE = "voteScore";
const SORT_BY_TIMESTAMP = "timestamp";

class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postsSort: SORT_BY_VOTE_SCORE
    }

    this.props.getPosts();
  }

  static propTypes = {
    category: PropTypes.string
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      this.setState({ posts: sortByField(Object.values(nextProps.posts), SORT_BY_VOTE_SCORE) });
    }
  }

  updateSort(field) {
    this.setState({
      postsSort: field,
      posts: sortByField(this.state.posts, field)
    });
  }

  render() {
    let posts = [];

    if (this.state.posts) {
      posts = this.state.posts;

      if (this.props.category) {
        posts = posts.filter(post => post.category === this.props.category);
      }
    }

    return (
      <div>
        <select value={this.state.postsSort} onChange={(event) => this.updateSort(event.target.value)}>
          <option value={SORT_BY_VOTE_SCORE}>{SORT_BY_VOTE_SCORE}</option>
          <option value={SORT_BY_TIMESTAMP}>{SORT_BY_TIMESTAMP}</option>
        </select>
        <ul className="posts-list">
          {posts.map((post, idx) => {
            let commentsNumber = 0;
            
            if(this.props.comments[post.id]) {
              commentsNumber = this.props.comments[post.id].length;
            }

            return (
              <li key={idx}><Link to={"/post/" + post.id}>{post.title}</Link> (score: {post.voteScore}) (comments: {commentsNumber})</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(getAsyncPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)