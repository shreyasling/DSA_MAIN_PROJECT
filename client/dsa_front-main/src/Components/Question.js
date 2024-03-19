import React from "react";
import Sample from "./Sample";

function Question(props) {
  const { category } = props;
  const questions = category.questions;

  return (
    <div style={{backgroundColor:"orange"}}>
      {questions.map((element) => (
        <div key={element._id} >
          <Sample question={element} />
        </div>
      ))}
    </div>
  );
}

export default Question;
