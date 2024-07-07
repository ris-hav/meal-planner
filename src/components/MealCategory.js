import React from "react";
import "./MealCategory.css";

const MealCategory = ({ category, onClick, isSelected }) => {
  return (
    <div className="meal-category">
      <button
        onClick={() => onClick(category)}
        className={isSelected ? "selected" : ""}
      >
        {category}
      </button>
    </div>
  );
};

export default MealCategory;
