import React from "react";

/* Best Selling Watches page */

const Products = () => {
  // Array of best selling watches
  const watches = [
    {
      name: "Orbis White Arabic",
      bracelet: " Bracelet: Silver Jubilee",
      price: "€250",
      image: "white arabic.png",
    },
    {
      name: "Orbis Green Arabic",
      bracelet: " Bracelet: Rose Gold Oyster",
      price: "€320",
      image: "green watch.png",
    },
    {
      name: "Orbis Chocolate",
      bracelet: " Bracelet: Rose Gold Oyster",
      price: "€350",
      image: "chocolate dial.png",
    },
    {
      name: "Orbis Black Arabic",
      bracelet: " Bracelet: Gold Jubilee",
      price: "€280",
      image: "black arabic.png",
    },
 
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Best Selling Watches</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {watches.map((watch, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#fdfdfd",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={watch.image}
              alt={`${watch.name}`}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{watch.name}</h3>
            <p>{watch.type}</p>
            <p style={{ fontWeight: "bold", color: "#444" }}>{watch.bracelet}</p>
            <p style={{ fontWeight: "bold", color: "#444" }}>{watch.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
