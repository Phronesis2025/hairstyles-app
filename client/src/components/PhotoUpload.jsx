import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../lib/supabaseClient";

const PhotoUpload = () => {
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    setPreview(null);

    // Validate file type
    const file = acceptedFiles[0];
    if (!file) {
      setError("Please upload a file.");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please upload a JPEG or PNG image.");
      return;
    }

    // Create a preview URL for the uploaded image
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setError("Please sign in to upload photos.");
      URL.revokeObjectURL(previewUrl);
      setPreview(null);
      return;
    }

    // Placeholder for uploading to Supabase Storage (implemented in next step)
    console.log("File ready for upload:", file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-green-600 bg-green-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-green-600">Drop the image here...</p>
          ) : (
            <p className="text-gray-600">
              Drag & drop a photo here, or click to select a file (JPEG or PNG
              only)
            </p>
          )}
        </div>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        {preview && (
          <div className="mt-4">
            <p className="text-gray-800 text-center mb-2">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto rounded-lg"
              onLoad={() => URL.revokeObjectURL(preview)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
