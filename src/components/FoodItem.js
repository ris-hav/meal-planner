import React from "react";
import "./FoodItem.css";

const FoodItem = ({ food }) => {
  const { name, calories, protein, carbs, fat } = food;
  return (
    <div className="food-item  selected-food">
      <span>{name}</span>
      <span>Calories: {calories}</span>
      <span>Protein: {protein}g</span>
      <span>Carbs: {carbs}g</span>
      <span>Fat: {fat}g</span>
    </div>
  );
};

export default FoodItem;
