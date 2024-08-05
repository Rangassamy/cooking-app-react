import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/app.css";

const App = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("beef"); // Valeur initiale de la requête

  useEffect(() => {
    // Supprimer l'état de chargement
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data.meals);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [query]); // Dépendance au texte de la requête

  const handleInputChange = (event) => {
    setQuery(event.target.value); // Met à jour la requête en fonction de l'entrée
  };

  return (
    <div>
      <h1>Cooking App in React!</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a meal..."
      />
      <ul className="meal-container">
        {data && data.length > 0 ? (
          data.map((meal) => (
            <li key={meal.idMeal} className="meal-card">
              <h2 className="meal-title">{meal.strMeal}</h2>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-image"
              />
              <a
                href={meal.strSource}
                className="meal-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Recipe Source
              </a>
            </li>
          ))
        ) : (
          <div>No results found</div>
        )}
      </ul>
    </div>
  );
};

export default App;
