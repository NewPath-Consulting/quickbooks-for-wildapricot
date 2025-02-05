import { useEffect, useState } from "react";

interface BlurryOverlayProps {
  isLoading: boolean;
}

export const BlurryOverlay: React.FC<BlurryOverlayProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Stops at 90% to wait for actual completion
      }, 500);
      return () => clearInterval(interval);
    } else {
      setProgress(100); // Instantly complete when cloning is done
      setTimeout(() => setProgress(0), 500); // Hide after completion
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ backdropFilter: "blur(8px)", zIndex: 1050 }}>
      <div className="text-center text-white">
        <div className="spinner-border text-light mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Cloning...</span>
        </div>
        <p className="fw-bold">Cloning in progress...</p>
        <div className="progress" style={{ width: "250px", height: "8px" }}>
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};
