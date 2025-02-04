import './PaymentConfig.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import * as React from "react";
import {useEffect, useReducer, useState} from "react";
import {getTenders} from "../../services/api/wild-apricot-api/tenderService.ts";
import {useNavigate} from "react-router-dom";
import {fetchData} from "../../services/fetchData.ts";
import AlternateMappingTable from "../../components/alternate-mapping-table/AlternateMappingTable.tsx";
import {tableColumns} from "../../components/alternate-mapping-table/tableColumns.ts";

export interface PaymentConfig {
  WATender: string,
  QBTender: string,
  QBTenderId: string
}

export interface Account {
  accountName: string,
  accountId: string
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { WATender: '', QBTender: '', QBTenderId: ''}]; // Append new row
    case "DELETE_ROW":
      return state.filter((_, index) => index !== action.payload.index); // Remove row at index
    case "CHANGE_WA_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["WATender"]: action.payload.value } // Update specific field
          : row
      );
    case "CHANGE_QB_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["QBTenderId"]: action.payload.value,  ["QBTender"]: action.payload.name} // Update specific field
          : row
      );
    default:
      return state;
  }
}

export const PaymentConfigPage = () => {
  const { onBoardingData, setCurrentStep, updateData } = useOnBoarding();

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [qbPaymentMethods, setQBPaymentMethods] = useState([]);
  const [WildApricotTenders, setWildApricotTenders] = useState([]);
  const [depositAccountsList, setDepositAccountsList] = useState([]);
  const [qbDepositAccount, setQBDepositAccount] = useState<Account>(onBoardingData.qbDepositAccount ?? {accountId: "", accountName: ""})

  const [paymentMappingList, dispatch] = useReducer(reducer, onBoardingData.paymentMappingList ?? [{ WATender: '', QBTender: '', QBTenderId: ''}]);

  const navigate = useNavigate()

  useEffect(() => {
    setCurrentStep(5);

    fetchData("select * from paymentmethod", setQBPaymentMethods, "PaymentMethod", setErrorMsg)
    fetchData("select * from account where AccountType IN ('Other Current Asset', 'Bank')", setDepositAccountsList, "Account", setErrorMsg)

    const listTenders = async () => {
      try{
        const tenders = await getTenders(onBoardingData.customerInfo.userId || '221748')
        setWildApricotTenders(tenders.data.map(tender => tender.Name))
      }
      catch (e){
        setWildApricotTenders([]);
        setErrorMsg(e.response.data.error)
      }
    }

    listTenders()
  }, []);

  useEffect(() => {
    updateData({
      paymentMappingList,
      qbDepositAccount,
    });
  }, [paymentMappingList, qbDepositAccount]);

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

  const handleMapping = (type, payload) => {
    dispatch({type, payload})
    console.log(paymentMappingList, "hello")
  }

  const handleAccountChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const accountId = selectedOption.value; // option's value
    const accountName = selectedOption.text;  // option's name (text inside <option>)

    setQBDepositAccount({accountId, accountName})

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
                value={qbDepositAccount.accountId}
                onChange={handleAccountChange}
              >
                <option value="">
                  Choose QB Payment Deposit Account
                </option>
                {depositAccountsList.map((option) => (
                  <option key={option.Id} value={option.Id}>
                    {option.Name}
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
        <AlternateMappingTable columns={tableColumns.payment} data={{WildApricotTenders, qbPaymentMethods}} mappingData={paymentMappingList} onMappingChange={handleMapping}/>
      </div>
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/invoice-config')}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={handleSubmission}>Next</button>
      </div>
    </main>
  )
}