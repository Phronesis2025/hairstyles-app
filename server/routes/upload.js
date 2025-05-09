import express from "express";
import multer from "multer";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Configure multer to store files in memory (we'll upload directly to Supabase)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Validate file type (JPEG or PNG only)
    if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
      return cb(new Error("Only JPEG and PNG files are allowed"), false);
    }
    cb(null, true);
  },
});

// Upload route
router.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    // Get the session token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Missing or invalid token." });
    }

    const token = authHeader.split(" ")[1];

    // Verify the user with the token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Failed to get user:", authError);
      return res
        .status(401)
        .json({
          error: "Unauthorized. Invalid token.",
          details: authError?.message,
        });
    }

    console.log("Authenticated user:", user.id);

    const userId = user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Generate a unique file name using user ID and timestamp
    const fileName = `${userId}/${Date.now()}-${file.originalname}`;

    // Log the file name for debugging
    console.log("Uploading file to Supabase Storage with path:", fileName);

    // Upload file to Supabase Storage (public bucket 'photos') with the token
    const { data, error: uploadError } = await supabase.storage
      .from("photos")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError);
      return res
        .status(500)
        .json({
          error: "Failed to upload file to Supabase Storage.",
          details: uploadError.message,
        });
    }

    // Get the public URL of the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from("photos").getPublicUrl(fileName);

    // Save metadata to Supabase database
    const { error: dbError } = await supabase.from("photos").insert({
      user_id: userId,
      s3_url: publicUrl,
      timestamp: new Date().toISOString(),
    });

    if (dbError) {
      // If database insert fails, delete the uploaded file to avoid orphaned files
      await supabase.storage.from("photos").remove([fileName]);
      return res
        .status(500)
        .json({
          error: "Failed to save metadata to database.",
          details: dbError.message,
        });
    }

    res
      .status(200)
      .json({ message: "Photo uploaded successfully.", url: publicUrl });
  } catch (err) {
    console.error("Server error during upload:", err);
    res
      .status(500)
      .json({ error: "Server error during upload.", details: err.message });
  }
});

export default router;
