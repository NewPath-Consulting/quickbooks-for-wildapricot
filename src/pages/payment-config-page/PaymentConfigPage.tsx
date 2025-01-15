import './PaymentConfig.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";

export const PaymentConfigPage = () => {
  const { setCurrentStep } = useOnBoarding();
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    setCurrentStep(5)
  }, []);

  return (
    <main>
      <header>
        <h2>Payment Configuration</h2>
        <p>Easily match payment fields from Wild Apricot to QuickBooks for a smooth and accurate integration process.</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
      <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
    </main>
  )
}