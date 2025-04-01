import React from "react";

// Best Selling Watches page
const Products = () => {
  const watches = [
    {
      name: "Orbis White Arabic",
      bracelet: "Bracelet: Silver Jubilee",
      price: "€250",
      image: "white arabic.png",
    },
    {
      name: "Orbis Green Arabic",
      bracelet: "Bracelet: Rose Gold Oyster",
      price: "€320",
      image: "green watch.png",
    },
    {
      name: "Orbis Chocolate",
      bracelet: "Bracelet: Rose Gold Oyster",
      price: "€350",
      image: "chocolate dial.png",
    },
    {
      name: "Orbis Black Arabic",
      bracelet: "Bracelet: Gold Jubilee",
      price: "€280",
      image: "black arabic.png",
    },
  ];

  return (
    <div style={{ padding: "40px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2.5rem", color: "#333" }}>
        Best Selling Watches
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {watches.map((watch, index) => (
          <div
            key={index}
            style={{
              border: "none",
              borderRadius: "12px",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={watch.image}
              alt={watch.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "15px", height: "auto" }}
            />
            <h3 style={{ margin: "10px 0", fontSize: "1.2rem", color: "#222" }}>{watch.name}</h3>
            <p style={{ margin: "5px 0", color: "#666" }}>{watch.bracelet}</p>
            <p style={{ fontWeight: "bold", color: "#111", fontSize: "1.1rem" }}>{watch.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
