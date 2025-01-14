import './InvoiceConfig.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {getQueriedResults} from "../../services/api/quickbooks-api/accountService.ts";
import {getMembershipLevels} from "../../services/api/wild-apricot-api/membershipService.ts";
import {IMembershipLevel} from "../../typings/IContactInformation.ts";
import {useNavigate} from "react-router-dom";

export const InvoiceConfigPage = () => {
  const { setCurrentStep } = useOnBoarding()
  const [errorMsg, setErrorMsg] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [account, setAccount] = useState("");
  const [membershipLevels, setMembershipLevels] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    setCurrentStep(4)

    const fetchAccounts = async () => {
      try{
        const response = await getQueriedResults("select * from account startposition 1 maxresults 15");
        console.log(response)
        const { queryResponse } = response
        setAccountList(queryResponse.Account.map((account) => ({name: account.Name, id: account.Id})))
      }
      catch (e){
        console.log(e)
        setErrorMsg(e.response.data.error)
      }
    }

    const fetchProducts = async () => {
      try{
        const response = await getQueriedResults("select * from item startposition 1 maxresults 15");
        console.log(response)
        const { queryResponse } = response
        setProducts(queryResponse.Item.map((account) => ({name: account.Name, id: account.Id})))
      }
      catch (e){
        console.log(e)
        setErrorMsg(e.response.data.error)
      }
    }

    const listMemberShipLevels = async () => {
      try{
        const membershipLevels = await getMembershipLevels('221748')
        setMembershipLevels(membershipLevels)
      }
      catch (e){
        setMembershipLevels([]);
        setErrorMsg(e.response.data.error)
      }
    }

    fetchAccounts()
    fetchProducts()
    listMemberShipLevels()
  }, []);
  
  const handleAccountSelection = (e) => {
    setAccount(e.target.value);
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
          <div className={'table'}>
            <div className={'table-header row'}>
                <p className={"col-6 fw-bolder"}>Membership level</p>
                <p className={"col-6 fw-bolder"}>QB Product</p>
            </div>
            <div className="table-body">
              {
                membershipLevels.map(membershipLevel => {
                  return (
                    <div key={membershipLevel.Id} className={'row align-items-center'}>
                      <p className={"col-5"}>{membershipLevel.Name}</p>
                      <i className={'bi bi-arrow-right col-1'} style={{color: '#c5c5c5'}}></i>
                      <div className={'col-6'}>
                        <select className="form-select" id={`qbProducts-${membershipLevel.Id}`} defaultValue={""}>
                          <option value={""} disabled={true}>Choose Product</option>
                          {products.map(product => {
                            return <option key={product.id} value={product.id}>{product.name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/customer-information')}>Back</button>
          <button className={"btn-success"} disabled={false}>Next</button>
        </div>
      </div>
    </main>
  )
}