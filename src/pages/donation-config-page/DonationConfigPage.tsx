import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export const DonationConfigPage = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  return (
    <main>
      <header>
        <h2>Donation Configuration</h2>
        <p>Easily match donation fields from Wild Apricot to QuickBooks for a smooth and accurate integration process.</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
          <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/payment-config')}>Back</button>
        <button className={"btn-success"} disabled={false} >Next</button>
      </div>
    </main>
  )
}