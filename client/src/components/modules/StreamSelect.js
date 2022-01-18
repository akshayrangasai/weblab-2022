import React from "react";
//import "./StreamSelect.css";

/**
 * Need to create 3 buttons
 *
 * Proptypes
 * @param {int} catHappiness is how happy your cat is
 */
const CatHappiness = (props) => {
  return (
    <div className="CatHappiness-container">
      <div className="CatHappiness-story">
        <p className="CatHappiness-storyContent">{props.catHappiness}</p>
      </div>
    </div>
  );
};

export default CatHappiness;