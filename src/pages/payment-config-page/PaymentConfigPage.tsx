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
      <div className={'payment-mapping'}>
        <h6>Payment Method Mapping</h6>
        <p className={'mb-3 mt-2'}>Map your WildApricot payment methods to one of your QuickBooks payment methods from the drop down</p>
        <div className={'table'}>
          <div className={'table-header row'}>
            <p className={"col-6 fw-bolder"}>Membership level</p>
            <p className={"col-6 fw-bolder"}>QB Product</p>
          </div>
          <div className="table-body">
            <div  className={'row align-items-center'}>
              <p className={"col-5"}>hello</p>
              <i className={'bi bi-arrow-right col-1'} style={{color: '#c5c5c5'}}></i>
              <div className={'col-6'}>
                <select className="form-select" id={`qbProducts`} defaultValue={""}>
                  <option value={""} disabled={true}>Choose Product</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}