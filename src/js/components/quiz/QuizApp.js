import React from "react";
import QuizList from "./QuizList";
import QuizForm from "./QuizForm";
import QuizView from "./QuizView";

const QuizApp = () => (
  <div>
    <div>
      <h2>Articles</h2>
      <QuizList />
    </div>
    <div>
      <h2>Add a new article</h2>
      <QuizForm />
    </div>
    <div>
      <QuizView />
    </div>
  </div>
)

export default QuizApp;