import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("qbAccessToken", accessToken);
      localStorage.setItem("qbRefreshToken", refreshToken);

      // Redirect to dashboard or desired page
      navigate("/create-connections");
    } else {
      console.error("Authorization failed or tokens missing");
    }
  }, []);

  return <div>Processing authentication...</div>;
};

export default OAuthSuccess;
