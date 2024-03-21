import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
    const { changeCategory, title, categoryData } = props;
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex note" >
            
                <h className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h>
            
            <div>
                <Link to={`/${title}`} className="text-white bg-blue-700 hover:bg-blue-800 mb-4 ml-10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-right dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => changeCategory(categoryData)}>Start</Link>
                
            </div>
        </div>
    );
}

export default Card;
