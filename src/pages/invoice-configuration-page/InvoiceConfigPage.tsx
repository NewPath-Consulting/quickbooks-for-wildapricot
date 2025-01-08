import './InvoiceConfig.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {getQueriedAccounts} from "../../services/api/quickbooks-api/accountService.ts";

export const InvoiceConfigPage = () => {

  const { setCurrentStep } = useOnBoarding()
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setCurrentStep(4)

    const fetchAccounts = async () => {
      const response = await getQueriedAccounts();
      console.log(response)
    }

    fetchAccounts()
  }, []);

  return (
    <main>
      <header>
        <h2>Invoice Configuration</h2>
        <p>Easily match fields from Wild Apricot to QuickBooks for a smooth and accurate integration process.</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
          <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}

      <div id={'content'}>
        <div className={'accounts-receivable mb-5'} >
          <h6>QuickBooks Receivable Account for Invoices</h6>
          <p className={'mb-3 mt-2'}>Please select your Accounts Receivable account name below</p>
          <div className="input-group mb-3" defaultValue={"Choose Account"} style={{maxWidth: '500px'}}>
            <label className="input-group-text" htmlFor="inputAccountsReceivable"><i className={'bi bi-receipt'}></i></label>
            <select className="form-select" id="inputAccountsReceivable">
              <option selected>Choose Account</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className={'accounts-receivable'}>
          <h6>Membership Level Mapping</h6>
          <p className={'mb-2 mt-2'}>Map the membership levels to one of your products by selecting a product from the drop down</p>
        </div>
      </div>
    </main>
  )
}