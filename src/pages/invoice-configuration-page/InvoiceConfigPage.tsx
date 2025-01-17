import './InvoiceConfig.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {getMembershipLevels} from "../../services/api/wild-apricot-api/membershipService.ts";
import {useNavigate} from "react-router-dom";
import {MappingTable} from "../../components/mapping-table/MappingTable.tsx";
import {fetchData} from "../../services/fetchData.ts";

interface InvoiceMapping {
  membership: string,
  product: string,
  productId: string
}

export const InvoiceConfigPage = () => {
  const { onBoardingData, setCurrentStep } = useOnBoarding()
  const [errorMsg, setErrorMsg] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [account, setAccount] = useState("");
  const [membershipLevels, setMembershipLevels] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoiceMappingList, setInvoiceMappingList] = useState<InvoiceMapping[]>([]);
  const navigate = useNavigate();
  const accountsReceivableErrorMsg = "Must choose an invoice account"


  useEffect(() => {
    setCurrentStep(4)

    fetchData("select * from item startposition 1 maxresults 15", setProducts, "Item", setErrorMsg)
    fetchData("select * from account startposition 1 maxresults 15", setAccountList, "Account", setErrorMsg)

    const listMemberShipLevels = async () => {
      try{
        const membershipLevels = await getMembershipLevels(onBoardingData.customerInfo.userId || '221748')
        setMembershipLevels(membershipLevels.map(level => ({name: level.Name, id: level.Id})))
      }
      catch (e){
        setMembershipLevels([]);
        setErrorMsg(e.response.data.error)
      }
    }

    listMemberShipLevels()
  }, []);
  
  const handleAccountSelection = (e) => {
    setAccount(e.target.value);

    if(errorMsg === accountsReceivableErrorMsg){
      setErrorMsg('');
    }
  }

  const handleSubmission = () => {
    // if(!account){
    //   setErrorMsg(accountsReceivableErrorMsg)
    //   console.log('not allowed')
    // }
    // else{
    //   navigate('/payment-config')
    // }
    navigate('/payment-config')
  }

  const handleMapping = (itemName, value, name) => {
    console.log(itemName, value, name)
  }

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
            <select className="form-select" id="inputAccountsReceivable" defaultValue={""} onChange={handleAccountSelection}>
              <option value={""} disabled={true}>Choose Account</option>
              {accountList.map(account => {
                return <option key={account.id} value={account.id}>{account.name}</option>
              })}
            </select>
          </div>
        </div>
        <div className={'accounts-receivable'}>
          <h6>Membership Level Mapping</h6>
          <p className={'mb-3 mt-2'}>Map your WildApricot membership levels to one of your products by selecting a QuickBook product from the drop down</p>
          <MappingTable onMappingChange={handleMapping} headers={["Membership Level", "QB Products"]} data={membershipLevels} mappingOptions={products} dropdownDefaultName={"Choose Product"}/>
        </div>
        <div className="mt-4">
          <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/customer-information')}>Back</button>
          <button className={"btn-success"} disabled={false} onClick={handleSubmission}>Next</button>
        </div>
      </div>
    </main>
  )
}