import React, { Component } from "react";
import Posts from "./Posts.js";
import PostForm from "./Postform.js";

class App extends Component {
  render() {
    return (
      <div>
        <PostForm />
        <hr/>
        <Posts />
      </div>
    )
  }
}

export default App;