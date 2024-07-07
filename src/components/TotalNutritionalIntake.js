import React from "react";
import "./TotalNutritionalIntake.css";

function TotalNutritionalIntake({ totals }) {
  return (
    <div className="totals">
      <h2>Total Nutritional Intake</h2>
      <p>Calories: {totals.totalCalories}</p>
      <p>Protein: {totals.totalProtein}g</p>
      <p>Carbs: {totals.totalCarbs}g</p>
      <p>Fat: {totals.totalFat}g</p>
    </div>
  );
}

export default TotalNutritionalIntake;
