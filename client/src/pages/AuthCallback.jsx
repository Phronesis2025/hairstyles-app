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
        navigate("/");
        return;
      }

      if (data.session) {
        const user = data.session.user;
        console.log("User authenticated:", user);

        // Insert the user into the users table
        const { error: insertError } = await supabase.from("users").upsert({
          user_id: user.id,
          email: user.email,
        });

        if (insertError) {
          console.error("Error inserting user into users table:", insertError);
        }

        navigate("/");
      } else {
        navigate("/");
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
