import React from "react";
import Sample from "./Sample";

function Question(props) {
  const { category } = props;
  const questions = category.questions;

  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Question Name
            </th>
            <th scope="col" class="px-6 py-3">
              Link
            </th>
            <th scope="col" class="px-6 py-3">
              Difficulty
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
        
  {questions.map((element) => (
    <Sample key={element._id} question={element}/>
  ))}

        </tbody>
      </table>
    </div>
  );
}

export default Question;
