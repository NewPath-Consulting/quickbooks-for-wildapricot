import { useEffect, useState } from "react";
import './BlurryOverlay.css'

interface BlurryOverlayProps {
  isLoading: boolean;
  message: string
}

export const BlurryOverlay: React.FC<BlurryOverlayProps> = ({ isLoading, message }) => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setExit(false); // Ensure we reset exit state when loading starts
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Stops at 90% to wait for actual completion
      }, 500);
      return () => clearInterval(interval);
    }
    else {
      setProgress(100); // Instantly complete when cloning is done
      setTimeout(() => setExit(true), 2500); // Hide after completion
    }

  }, [isLoading]);

  if (exit) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center blur-container" style={{ backdropFilter: "blur(8px)", zIndex: 1050 }}>
      <div className="text-black text-center d-flex flex-column align-items-center justify-content-center">
        {isLoading ? <div className="custom-spinner mb-5">
          <div className={"inner-icon"}>
            <i className={'bi bi-copy'} style={{color: 'white'}}></i>
          </div>
        </div> : message === "Error Occurred!" ?
          <i className={'bi bi-exclamation-circle-fill fs-1'} style={{color: 'red', fontSize: '30px'}}></i> :
      <i className={'bi bi-check-circle-fill fs-1'} style={{color: '#71DD93FF'}}></i>}
        <p className="fw-medium fs-4 mb-1" style={{fontFamily: 'sans-serif'}}>{message}</p>
        {isLoading && <h6 className="fw-light" style={{fontFamily: 'sans-serif'}}>Setting up yours workflows and preparing ...</h6>}
      </div>
    </div>
  );
};
