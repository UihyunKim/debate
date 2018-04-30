import React from "react";
import QuizList from "./QuizList";
import QuizForm from "./QuizForm";

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
  </div>
)

export default QuizApp;