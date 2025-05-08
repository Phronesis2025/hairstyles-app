import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gc-light-gray">
      <header className="bg-gc-green text-gc-white py-4">
        <h1 className="text-3xl font-bold text-center font-inter">
          Hairstyle Visualizer
        </h1>
      </header>
      <main className="container mx-auto p-6">
        <div className="bg-gc-white rounded-lg shadow-sm p-6">
          <p className="text-gc-dark-gray text-center font-inter">
            Welcome to the Hairstyle Visualizer!
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
