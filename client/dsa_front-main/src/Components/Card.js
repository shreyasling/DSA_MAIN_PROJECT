import React from "react";
import { Link } from "react-router-dom";
function Card(props) {
    const {changeCategory,title,categoryData}=props
  return (
    <div className="note">
      <h1>{title}</h1>
      <Link to={`/${title}`} className="button" onClick={()=>changeCategory(categoryData)}>Start</Link>
    </div>
  );
}

export default Card;
