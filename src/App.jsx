import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;

    if (
      url.includes("/api/user/googleAuthUrl") &&
      url.includes("code=")
    ) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (<AppRoutes />);
}

export default App;