// QAP 3
// App for Filter countries by neighbors starting with A or I
// Created by: Jeff Woolridge

import React, { useState, useEffect } from "react";
import NeighborsA from "./components/NeighborsA";
import NeighborsI from "./components/NeighborsI";

// Main App component
function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState(null);

  // Fetch countries data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3"
        );

        // Check if the response is ok
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data); // Initialize filteredCountries with all countries
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Error fetching countries data:", error);
      }
     
    }
    fetchData();
  }, []);

  // Function to get country name by CCA3 code
  const getCountryNameByCCA3 = (code) => {
    const country = countries.find((c) => c.cca3 === code);
    return country ? country.name.official : "";
  };

  // Function to handle filtering countries
  const handleFilter = (letter) => {
    if (!countries.length) return;

    // Filter countries based on neighbors starting with the specified letter
    const filtered = countries.filter((country) => {
      if (!country.borders) return false;
      return country.borders.some((borderCCA3) => {
        const neighborName = getCountryNameByCCA3(borderCCA3);
        return neighborName.startsWith(letter);
      });
    });

    // Update the filteredCountries state and set the current filter
    setFilteredCountries(filtered);
    setFilter(letter);
  };

  // Render the main app
  return (
    <div>
      <h1>Neighboring Countries</h1>
      <div className="button-container">

        {/* Add a button to filter neighbors starting with "A" */}
        <button onClick={() => handleFilter("A")}>
          Neighbors Starting With A
        </button>

        {/* Add a button to filter neighbors starting with "I" */}
        <button onClick={() => handleFilter("I")}>
          Neighbors Starting With I
        </button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* Filter Countries starting with A */}
      {filter === "A" && (
        <NeighborsA
          countries={filteredCountries}
          getCountryNameByCCA3={getCountryNameByCCA3}
        />
      )}

      {/* Filter Countries starting with I */}
      {filter === "I" && (
        <NeighborsI
          countries={filteredCountries}
          getCountryNameByCCA3={getCountryNameByCCA3}
        />
      )}
    </div>
  );
}

export default App;
