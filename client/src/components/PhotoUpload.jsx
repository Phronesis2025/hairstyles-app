import { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../lib/supabaseClient";

const PhotoUpload = () => {
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [mode, setMode] = useState("upload"); // 'upload' or 'camera'
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle file upload via drag-and-drop or file selection
  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    setPreview(null);
    setUploadedUrl(null);

    const file = acceptedFiles[0];
    if (!file) {
      setError("Please upload a file.");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please upload a JPEG or PNG image.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setError("Please sign in to upload photos.");
      URL.revokeObjectURL(previewUrl);
      setPreview(null);
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload photo.");
      }

      setUploadedUrl(result.url);
    } catch (err) {
      setError(err.message);
      setPreview(null);
      URL.revokeObjectURL(previewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  // Start the camera
  const startCamera = async () => {
    try {
      setError(null);
      setPreview(null);
      setUploadedUrl(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      setError("Failed to access camera: " + err.message);
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Capture a photo from the camera
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );
    const file = new File([blob], `photo-${Date.now()}.jpeg`, {
      type: "image/jpeg",
    });

    // Stop the camera
    stopCamera();

    // Set the preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Upload the captured photo
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setError("Please sign in to upload photos.");
      URL.revokeObjectURL(previewUrl);
      setPreview(null);
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload photo.");
      }

      setUploadedUrl(result.url);
    } catch (err) {
      setError(err.message);
      setPreview(null);
      URL.revokeObjectURL(previewUrl);
    }
  };

  // Clean up the camera stream on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => {
              setMode("upload");
              stopCamera();
              setPreview(null);
              setUploadedUrl(null);
              setError(null);
            }}
            className={`px-4 py-2 rounded-full ${
              mode === "upload"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            } hover:bg-green-700 transition`}
          >
            Upload Photo
          </button>
          <button
            onClick={() => {
              setMode("camera");
              startCamera();
            }}
            className={`px-4 py-2 rounded-full ${
              mode === "camera"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            } hover:bg-green-700 transition`}
          >
            Take Photo
          </button>
        </div>

        {mode === "upload" && (
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
        )}

        {mode === "camera" && (
          <div className="text-center">
            <video
              ref={videoRef}
              className="w-full rounded-lg mb-4"
              autoPlay
              playsInline
            />
            <canvas ref={canvasRef} className="hidden" />
            <button
              onClick={capturePhoto}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
            >
              Capture Photo
            </button>
          </div>
        )}

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

        {uploadedUrl && (
          <div className="mt-4">
            <p className="text-gray-800 text-center mb-2">Uploaded Photo:</p>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline"
            >
              View Uploaded Photo
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
