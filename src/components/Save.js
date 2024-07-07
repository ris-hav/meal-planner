import React, { useState } from "react";
import "./Save.css";
function Save({
  totals,
  balancedData,
  setSelectedCategory,
  setSelectedFoods,
  selectedFoods,
  userPoints,
  setUserPoints,
}) {
  const [showSaveMessage, setShowSaveMessage] = useState("");

  const handleSave = () => {
    checkBalancedMeal(totals);
    setTimeout(() => setShowSaveMessage(""), 5000);
  };

  const handleReset = () => {
    setSelectedCategory("");
    setTimeout(() => setSelectedCategory("breakfast"), 0);
    setSelectedFoods({});
  };

  const checkBalancedMeal = (totals) => {
    const { totalCalories, totalProtein, totalCarbs, totalFat } = totals;
    const keyString = `${totalCalories}-${totalProtein}-${totalCarbs}-${totalFat}`;

    if (localStorage.getItem(keyString)) {
      setShowSaveMessage("This meal plan has already been saved.");
      return;
    }

    if (
      totalCalories >= balancedData.calories.min &&
      totalCalories <= balancedData.calories.max &&
      totalProtein >= balancedData.protein.min &&
      totalProtein <= balancedData.protein.max &&
      totalCarbs >= balancedData.carbs.min &&
      totalCarbs <= balancedData.carbs.max &&
      totalFat >= balancedData.fat.min &&
      totalFat <= balancedData.fat.max
    ) {
      localStorage.setItem(keyString, JSON.stringify(selectedFoods));
      setUserPoints((prevPoints) => {
        const newPoints = prevPoints + 5;
        localStorage.setItem("rewards", newPoints);
        return newPoints;
      });
      setShowSaveMessage(
        "Congratulations! You've created a balanced meal plan!🎉🎉"
      );
    } else {
      setShowSaveMessage("Not yet achieved the balanced meal plan...");
    }
  };
  return (
    <>
      <div className="top-right-buttons">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      {showSaveMessage && (
        <div
          className={`${
            showSaveMessage.startsWith("Not")
              ? "not-message"
              : showSaveMessage.startsWith("Congratulations")
              ? "save-message"
              : "already-saved-message"
          }`}
        >
          {showSaveMessage}
        </div>
      )}
    </>
  );
}

export default Save;
