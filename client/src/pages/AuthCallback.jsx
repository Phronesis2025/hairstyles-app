import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        navigate("/"); // Redirect to home on error
        return;
      }

      if (data.session) {
        console.log("User authenticated:", data.session.user);
        navigate("/"); // Redirect to home after successful login
      } else {
        navigate("/"); // Redirect to home if no session
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <p className="text-gray-800">Processing authentication...</p>
    </div>
  );
};

export default AuthCallback;
