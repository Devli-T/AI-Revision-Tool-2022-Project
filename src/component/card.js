import React, { useState } from 'react';
import '../css/card.css'; // Import the CSS file for card styling

function Card({questionText, answerText}) {
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className={`card ${isHidden ? 'hidden' : 'visible'}`}
      onClick={handleClick}
    >   
      <div className="card-content">
        {isHidden ? (
          <div className="hidden-writing">{answerText}</div>
        ) : (
          <div className="visible-writing">{questionText}</div>
        )}
      </div>
    </div>
  );
}

export default Card;
