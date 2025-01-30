import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";


export const DonationConfigPage = () => {
  const { setCurrentStep, onBoardingData } = useOnBoarding();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentStep(6)
    console.log(onBoardingData)
  }, []);

  return (
    <main>
      <header>
        <h2>Donation Configuration</h2>
        <p>Review your mapping configurations and confirm to start cloning scenarios into your Make.com account</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
          <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/payment-config')}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={() => navigate('/clone-scenarios')}>Next</button>
      </div>
    </main>
  )
}