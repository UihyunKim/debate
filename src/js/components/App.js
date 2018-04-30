import React, { Component } from "react";
import Posts from "./Posts.js";
import PostForm from "./Postform.js";
import { Provider } from "react-redux";
import store from "../store/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <PostForm />
          <hr/>
          <Posts />
        </div>
      </Provider>
    )
  }
}

export default App;