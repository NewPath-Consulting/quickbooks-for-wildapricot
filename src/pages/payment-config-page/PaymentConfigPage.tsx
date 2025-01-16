import './PaymentConfig.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {getQueriedResults} from "../../services/api/quickbooks-api/accountService.ts";
import {getMembershipLevels} from "../../services/api/wild-apricot-api/membershipService.ts";
import {getTenders} from "../../services/api/wild-apricot-api/tenderService.ts";
import {MappingTable} from "../../components/mapping-table/MappingTable.tsx";
import {useNavigate} from "react-router-dom";
import {fetchData} from "../../services/fetchData.ts";

export const PaymentConfigPage = () => {
  const { onBoardingData, setCurrentStep } = useOnBoarding();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [qbPaymentMethods, setQBPaymentMethods] = useState([]);
  const [WildApricotTenders, setWildApricotTenders] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentStep(5)

    fetchData("select * from paymentmethod startposition 1 maxresults 15", setQBPaymentMethods, "PaymentMethod", setErrorMsg)
    fetchData("select * from account startposition 1 maxresults 15", setAccountList, "Account", setErrorMsg)

    const listTenders = async () => {
      try{
        const tenders = await getTenders(onBoardingData.customerInfo.userId || '221748')
        console.log(tenders.data)
        setWildApricotTenders(tenders.data.map(tender => ({name: tender.Name, id: tender.Id})))
      }
      catch (e){
        setWildApricotTenders([]);
        setErrorMsg(e.response.data.error)
      }
    }

    listTenders()
  }, []);

  const handleSubmission = () => {

  }

  return (
    <main>
      <header>
        <h2>Payment Configuration</h2>
        <p>Easily match payment fields from Wild Apricot to QuickBooks for a smooth and accurate integration process.</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
      <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
      <div className="default-payment-mapping">
        <h6>Default Payment Mapping</h6>
        <p className={'mb-3 mt-2'}>Map your QuickBooks payment deposit account to your QuickBooks receivables account by selecting each from the dropdowns below</p>
        <div className="row">
          <div className="col-md-6 mb-2">
            <select
              className="form-select"
              id={`mapping`}
              defaultValue={""}
            >
              <option value="" disabled>
                Choose QB Payment Deposit Account
              </option>
              {accountList.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              id={`mapping`}
              defaultValue={""}
            >
              <option value="" disabled>
                Choose Receivables Account
              </option>
              {accountList.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={'payment-mapping'}>
        <h6>Payment Method Mapping</h6>
        <p className={'mb-3'}>Map your WildApricot payment methods to one of your QuickBooks payment methods from the dropdown</p>
        <MappingTable headers={["WA Tender", "QB Tender"]} data={WildApricotTenders} mappingOptions={qbPaymentMethods} dropdownDefaultName={"Choose Payment Tender"}/>
      </div>
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/invoice-config')}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={handleSubmission}>Next</button>
      </div>
    </main>
  )
}