import './PaymentConfig.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {getQueriedResults} from "../../services/api/quickbooks-api/accountService.ts";
import {getMembershipLevels} from "../../services/api/wild-apricot-api/membershipService.ts";
import {getTenders} from "../../services/api/wild-apricot-api/tenderService.ts";
import {MappingTable} from "../../components/mapping-table/MappingTable.tsx";
import {useNavigate} from "react-router-dom";

export const PaymentConfigPage = () => {
  const { onBoardingData, setCurrentStep } = useOnBoarding();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [qbPaymentMethods, setQBPaymentMethods] = useState([]);
  const [WildApricotTenders, setWildApricotTenders] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentStep(5)

    const fetchPaymentMethods = async () => {
      try{
        const response = await getQueriedResults("select * from paymentmethod startposition 1 maxresults 15");
        console.log(response)
        const { queryResponse } = response
        setQBPaymentMethods(queryResponse.PaymentMethod.map((account) => ({name: account.Name, id: account.Id})))
      }
      catch (e){
        console.log(e)
        setErrorMsg(e.response.data.error)
      }
    }

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

    fetchPaymentMethods()
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
      <div className={'payment-mapping'}>
        <h6>Payment Method Mapping</h6>
        <p className={'mb-3 mt-2'}>Map your WildApricot payment methods to one of your QuickBooks payment methods from the drop down</p>
        <MappingTable headers={["WA Tender", "QB Tender"]} data={WildApricotTenders} mappingOptions={qbPaymentMethods} dropdownDefaultName={"Choose Payment"}/>
      </div>
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/invoice-config')}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={handleSubmission}>Next</button>
      </div>
    </main>
  )
}