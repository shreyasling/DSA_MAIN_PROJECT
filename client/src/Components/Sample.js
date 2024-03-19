import React from "react";

function Sample(props) {
  const { question } = props;
  return (
    <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <div>{question.question_name}</div>
      <a href={question.question_link[0]} target="_blank"
            rel="noopener noreferrer" >Link</a>
      <div>{question.question_difficulty}</div>
      <div>{question.question_status}</div>
      
    </div>
  );
}

export default Sample;
