
import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
    const { changeCategory, title, categoryData } = props;
    return (
        <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-white ">
            <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2 text-gray-800 dark:text-gray-200">{title}</div>
                <p className="text-gray-700 dark:text-gray-300 text-base">{/* Add any additional information here */}</p>
            </div>
            <div className="px-6 py-5">
                <Link to={`/${title}`} onClick={() => changeCategory(categoryData)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300">Start</Link>
            </div>
        </div>
    );
}

export default Card;
