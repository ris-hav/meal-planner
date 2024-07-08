import React, { useState, useEffect } from "react";
import MealCategory from "./components/MealCategory";
import FoodItem from "./components/FoodItem";
import TotalNutritionalIntake from "./components/TotalNutritionalIntake";
import Save from "./components/Save";
import foodsData from "./data/foods.json";
import balancedData from "./data/balancedNutrition.json";
import "./App.css";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("breakfast");
  const [selectedFoods, setSelectedFoods] = useState({});
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const savedPoints = localStorage.getItem("rewards");
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints));
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory("");
    setTimeout(() => setSelectedCategory(category), 0);
  };

  const handleFoodClick = (food) => {
    setSelectedFoods((prevSelectedFoods) => {
      const category = selectedCategory;
      const currentSelectedFoods = prevSelectedFoods[category] || [];

      if (currentSelectedFoods.includes(food)) {
        const updatedCategoryFoods = currentSelectedFoods.filter(
          (selectedFood) => selectedFood !== food
        );

        if (updatedCategoryFoods.length === 0) {
          const updatedSelectedFoods = { ...prevSelectedFoods };
          delete updatedSelectedFoods[category];
          return updatedSelectedFoods;
        }

        return {
          ...prevSelectedFoods,
          [category]: updatedCategoryFoods,
        };
      } else {
        return {
          ...prevSelectedFoods,
          [category]: [...currentSelectedFoods, food],
        };
      }
    });
  };

  const calculateTotalNutritionalIntake = () => {
    let totals = {};

    Object.values(selectedFoods).forEach((foods) => {
      foods.forEach((food) => {
        totals.totalCalories = (totals.totalCalories || 0) + food.calories;
        totals.totalProtein = (totals.totalProtein || 0) + food.protein;
        totals.totalCarbs = (totals.totalCarbs || 0) + food.carbs;
        totals.totalFat = (totals.totalFat || 0) + food.fat;
      });
    });

    return totals;
  };

  const totals = calculateTotalNutritionalIntake();
  const hasSelectedFoods = Object.keys(selectedFoods).length > 0;

  return (
    <div className="App">
      <h1>Meal Planner</h1>
      <div className="main-container">
        <div className="meal-planner">
          <div className="user-points">
            <h2>
              Rewards : {userPoints}
              {`${userPoints ? "XP" : ""}`}
            </h2>
          </div>
          <div className="categories">
            {Object.keys(foodsData).map((category) => (
              <MealCategory
                key={category}
                category={category}
                onClick={handleCategoryClick}
                isSelected={selectedCategory === category}
              />
            ))}
          </div>
          {selectedCategory && (
            <div className="food-list">
              <h2>{selectedCategory}</h2>
              <ul>
                {foodsData[selectedCategory].map((food, index) => (
                  <li
                    key={index}
                    onClick={() => handleFoodClick(food)}
                    className={
                      selectedFoods[selectedCategory]?.includes(food)
                        ? "selected-food"
                        : ""
                    }
                  >
                    <span>{food.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasSelectedFoods && <TotalNutritionalIntake totals={totals} />}
        </div>
        <div className="selected-foods">
          {hasSelectedFoods && (
            <>
              <h2>Selected Foods</h2>
              <div className="scollable-selected">
                {Object.keys(selectedFoods).map((category) => (
                  <div key={category}>
                    <h3>{category}</h3>
                    <ul>
                      {selectedFoods[category].map((food, index) => (
                        <li key={food.name}>
                          <FoodItem food={food} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {hasSelectedFoods && (
        <Save
          totals={totals}
          balancedData={balancedData}
          setSelectedCategory={setSelectedCategory}
          setSelectedFoods={setSelectedFoods}
          selectedFoods={selectedFoods}
          userPoints={userPoints}
          setUserPoints={setUserPoints}
        />
      )}
    </div>
  );
};

export default App;
