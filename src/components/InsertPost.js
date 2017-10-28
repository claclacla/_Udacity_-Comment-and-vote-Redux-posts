import React from 'react';

class InsertPost extends React.Component {
  state = {
    title: ""
  };

  updateTitle = (title) => {
    this.setState({ title });
  }

  addPost = () => {
    console.log("HI");
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <b>Insert a new post:</b>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={(event) => this.updateTitle(event.target.value)} value={this.state.title} />
          <button onClick={this.addPost}>Add</button>
        </form>
      </div>
    );
  }
}

export default InsertPost;