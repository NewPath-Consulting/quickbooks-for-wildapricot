import './PaymentConfig.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import * as React from "react";
import {useEffect, useState} from "react";
import {getTenders} from "../../services/api/wild-apricot-api/tenderService.ts";
import {MappingTable} from "../../components/mapping-table/MappingTable.tsx";
import {useNavigate} from "react-router-dom";
import {fetchData} from "../../services/fetchData.ts";
import {PaymentMappingTable} from "../../components/payment-mapping-table/PaymentMappingTable.tsx";

interface PaymentMapping {
  WATender: string,
  QBTender: string,
  QBTenderId: string
}

interface Account {
  accountName: string,
  accountId: string
}

export const PaymentConfigPage = () => {
  const { onBoardingData, setCurrentStep } = useOnBoarding();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [qbPaymentMethods, setQBPaymentMethods] = useState([]);
  const [WildApricotTenders, setWildApricotTenders] = useState([]);
  const [receivableAccountsList, setReceivableAccountsList] = useState([]);
  const [depositAccountsList, setDepositAccountsList] = useState([]);
  const [qbDepositAccount, setQBDepositAccount] = useState<Account>()
  const [qbReceivableAccount, setQBReceivableAccount] = useState<Account>()
  const [paymentMappingList, setPaymentMappingList] = useState<PaymentMapping[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    setCurrentStep(5)

    fetchData("select * from paymentmethod", setQBPaymentMethods, "PaymentMethod", setErrorMsg)
    fetchData("select * from account where AccountType = 'Accounts Receivable'", setReceivableAccountsList, "Account", setErrorMsg)
    fetchData("select * from account where AccountType = 'Bank'", setDepositAccountsList, "Account", setErrorMsg)

    const listTenders = async () => {
      try{
        const tenders = await getTenders(onBoardingData.customerInfo.userId || '221748')
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

    // if(!qbReceivableAccount){
    //   setErrorMsg("Must choose a receivables account")
    // }
    // else if(!qbDepositAccount){
    //   setErrorMsg("Must choose a deposit account")
    // }
    // else if(paymentMappingList.length !== WildApricotTenders.length){
    //   setErrorMsg("Please map all WildApricot tenders to QuickBooks tenders")
    // }
    // else{
    //   navigate('/donation-config')
    // }
    navigate('/donation-config')
  }

  const handleMapping = (itemName, optionId, optionName) => {

    setPaymentMappingList((prev) => {
      const foundIndex = prev.findIndex((tender) => tender.WATender === itemName);

      if (foundIndex !== -1) {
        const updatedList = [...prev];
        updatedList[foundIndex] = {
          ...updatedList[foundIndex],
          QBTender: optionName,
          QBTenderId: optionId,
        };
        return updatedList;
      }

      // Add a new mapping if it doesn't exist
      return [...prev, { QBTender: optionName, QBTenderId: optionId, WATender: itemName }];
    });

    console.log(paymentMappingList, "hello")
  }

  const handleAccountChange = (event, accountType) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const accountId = selectedOption.value; // option's value
    const accountName = selectedOption.text;  // option's name (text inside <option>)

    if(accountType === 'deposit'){
      setQBDepositAccount({accountId, accountName})
    }
    else {
      setQBReceivableAccount({accountId, accountName})
    }

    console.log(qbDepositAccount, qbReceivableAccount)
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
          <div className={'col-md-6'}>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="qb-deposit-account"><i className={'bi bi-receipt'}></i></label>
              <select
                className="form-select"
                id={`qb-deposit-account`}
                defaultValue={""}
                onChange={(event) => handleAccountChange(event, 'deposit')}
              >
                <option value="" disabled>
                  Choose QB Payment Deposit Account
                </option>
                {depositAccountsList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <label className="input-group-text" htmlFor="qb-receivable-account"><i className={'bi bi-receipt'}></i></label>
              <select
                className="form-select"
                id={`qb-receivable-account`}
                defaultValue={""}
                onChange={(event) => handleAccountChange(event, 'receivable')}
              >
                <option value="" disabled>
                  Choose Receivables Account
                </option>
                {receivableAccountsList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={'payment-mapping'}>
        <h6>Payment Method Mapping</h6>
        <p className={'mb-3'}>Map your WildApricot payment methods to one of your QuickBooks payment methods from the dropdown</p>
        <MappingTable onMappingChange={handleMapping} headers={["WA Tender", "QB Tender"]} data={WildApricotTenders} mappingOptions={qbPaymentMethods}/>
      </div>
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/invoice-config')}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={handleSubmission}>Next</button>
      </div>
    </main>
  )
}