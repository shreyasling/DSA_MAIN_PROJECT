import React from 'react';
import './CustomProgressBar.css';

function CustomProgressBar(props) {
  const { done, total } = props;

  const percentDone = Math.round((done / total) * 100);

  return (
    <div className="relative "> {/* Added mb-8 to provide some bottom margin */}
      <div className="text-lg font-bold   ">
        ({done}/{total}) Questions
      </div>
      <div className="range" style={{ '--p': percentDone }}></div>
    </div>
  );
}

export default CustomProgressBar;
