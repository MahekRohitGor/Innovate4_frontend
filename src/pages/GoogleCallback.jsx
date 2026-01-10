import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        navigate("/login", { replace: true });
      } catch (err) {
        console.error("Google auth failed", err);
        navigate("/signup");
      }
    };

    handleGoogleAuth();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
      Connecting Google Calendar…
    </div>
  );
};

export default GoogleCallback;