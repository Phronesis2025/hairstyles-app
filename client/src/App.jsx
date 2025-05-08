import "./App.css";

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#00A651",
          color: "#FFFFFF",
          padding: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Hairstyle Visualizer
        </h1>
      </header>
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem" }}>
        <p>Welcome to the Hairstyle Visualizer!</p>
      </main>
    </div>
  );
}

export default App;
