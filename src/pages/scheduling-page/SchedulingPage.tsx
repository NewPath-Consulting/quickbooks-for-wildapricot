import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";


export const SchedulingPage = () => {
  const { setCurrentStep } = useOnBoarding()
  const navigate = useNavigate()

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setCurrentStep(7)

  }, []);

  return (
    <main>
      <header>
        <h2>Job Scheduling</h2>
        <p>Schedule your workflows either manually or automatically.</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
          <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/donation-config')}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={() => navigate('/clone-scenarios')}>Next</button>
      </div>
    </main>
  )
}