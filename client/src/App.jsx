import React from "react";
import { supabase } from "./lib/supabaseClient";
import PhotoUpload from "./components/PhotoUpload.jsx";
import "./App.css";

function App() {
  const handleSignOut = async () => {
    console.log("Attempting to sign out...");
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    console.log("Current session before sign out:", session);

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }

    console.log("Sign out successful");

    // Force a session refresh to ensure the client updates
    await supabase.auth.refreshSession();
    const {
      data: { session: newSession },
      error: newSessionError,
    } = await supabase.auth.getSession();
    console.log("Session after sign out:", newSession);

    if (newSession) {
      console.warn("Session still exists after sign out. Forcing UI update.");
    }

    window.location.reload(); // Refresh to update UI
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4">
        <div className="text-xl font-bold text-green-600">HairViz</div>
        <div className="space-x-4">
          <a
            href="#"
            className="text-green-600 border border-green-600 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white transition"
          >
            Home
          </a>
          <button
            onClick={handleSignOut}
            className="text-gray-600 hover:text-green-600"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Visualize the Perfect Hairstyle
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Upload a photo, explore different hairstyles, and find the perfect
          look for your clients. Fast, easy, and mobile-friendly.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="http://localhost:5000/api/auth/signup"
            className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-green-700 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>Sign Up with Google</span>
          </a>
          <a
            href="http://localhost:5000/api/auth/login"
            className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-600 hover:text-white transition"
          >
            Sign In with Google
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Step 1: Upload */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload</h3>
            <p className="text-gray-600">
              Upload a client photo from your device or take one directly in the
              app.
            </p>
          </div>

          {/* Step 2: Swipe */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Swipe</h3>
            <p className="text-gray-600">
              Browse through our library of hairstyles and visualize them on
              your client.
            </p>
          </div>

          {/* Step 3: Generate */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Generate
            </h3>
            <p className="text-gray-600">
              Describe custom hairstyles and let AI generate personalized
              options.
            </p>
          </div>

          {/* Step 4: Save */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7v8a2 2 0 002 2h6a2 2 0 002-2V7m-6 8v-4m-4 4h8"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Save</h3>
            <p className="text-gray-600">
              Save and share the best styles with your clients or save to your
              gallery.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Upload Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Upload a Photo
        </h2>
        <PhotoUpload />
      </section>
    </div>
  );
}

export default App;
