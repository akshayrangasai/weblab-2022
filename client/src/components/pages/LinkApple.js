import React from "react";
import "./LinkSpotify.css";

/**
 * Component that links to their spotify page automatically, gets authorization, and sends them to the dashboard
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