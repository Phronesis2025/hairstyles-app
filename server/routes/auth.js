import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Signup route (initiates Google login)
router.get("/signup", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback", // Frontend callback URL
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Redirect the user to the Google login page
    res.redirect(data.url);
  } catch (err) {
    res.status(500).json({ error: "Server error during signup" });
  }
});

// Login route (same as signup for OAuth flow, but kept separate for clarity)
router.get("/login", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback", // Frontend callback URL
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.redirect(data.url);
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// Logout route
router.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    res.status(500).json({ error: "Server error during logout" });
  }
});

export default router;
