// NeighborsA component to display countries with neighbors starting with "I"
function NeighborsA({ countries, getCountryNameByCCA3 }) {
  return (
    <div>
      <h2>Countries with neighbors starting with "I"</h2>

      {/* Map through the countries array and filter neighbors starting with "I" */}
      {countries.map((country) => {
        const neighborsWithA = country.borders
          ? country.borders
              .map((code) => getCountryNameByCCA3(code))
              .filter((name) => name && name.startsWith("I"))
          : [];
        
        // Render each country with its neighbors starting with "I"
        return (
          <div
            key={country.cca3}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "lightyellow",
              color: "darkblue",
            }}
          >
            {/* Display country name, capital, and flag */}
            <h3>{country.name.official}</h3>
            <p>
              <strong>Capital:</strong>{" "}
              {country.capital}
            </p>
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.official}`}
              style={{ width: "150px", height: "auto", border: "1px solid #ddd" }}
            />
            <p><strong>Neighbors (I):</strong></p>
            <ul>
              {neighborsWithA.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default NeighborsA;
