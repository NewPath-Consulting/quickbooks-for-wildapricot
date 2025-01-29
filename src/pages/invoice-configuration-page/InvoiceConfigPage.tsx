import './InvoiceConfig.css'
import * as React from "react";
import {useEffect, useReducer, useState} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {getMembershipLevels} from "../../services/api/wild-apricot-api/membershipService.ts";
import {useNavigate} from "react-router-dom";
import {AlternateMappingTable} from "../../components/alternate-mapping-table/AlternateMappingTable.tsx";
import {fetchData} from "../../services/fetchData.ts";
import {DefaultMappingTable} from "../../components/default-mapping-table/DefaultMappingTable.tsx";
import {getEventTags} from "../../services/api/wild-apricot-api/eventsService.ts";
import {getProductTags} from "../../services/api/wild-apricot-api/storeService.ts";

interface InvoiceMapping {
  membership: string,
  product: string,
  productId: string
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { WAFieldName: '', QBProduct: '', QBProductId: ''}]; // Append new row
    case "DELETE_ROW":
      return state.filter((_, index) => index !== action.payload.index); // Remove row at index
    case "CHANGE_WA_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["WAFieldName"]: action.payload.value } // Update specific field
          : row
      );
    case "CHANGE_QB_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["QBProductId"]: action.payload.value,  ["QBProduct"]: action.payload.name} // Update specific field
          : row
      );
    default:
      return state;
  }
}

const init = (initialState) => {
  return initialState; // Just return the initial state
}

export const InvoiceConfigPage = () => {
  const { onBoardingData, setCurrentStep } = useOnBoarding()
  const [errorMsg, setErrorMsg] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [account, setAccount] = useState("");
  const [membershipLevels, setMembershipLevels] = useState([]);
  const [products, setProducts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [hasClasses, setHasClasses] = useState(false)
  const navigate = useNavigate();
  const accountsReceivableErrorMsg = "Must choose an invoice account"
  const [eventTags, setEventTags] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [membershipLevelMappingList, dispatchMembershipMapping] = useReducer(reducer, [{ WAFieldName: '', QBProduct: '', QBProductId: ''}], init);
  const [eventMappingList, dispatchEventMapping] = useReducer(reducer, [{ WAFieldName: '', QBProduct: '', QBProductId: ''}], init);
  const [onlineStoreMappingList, dispatchOnlineStoreMapping] = useReducer(reducer, [{ WAFieldName: '', QBProduct: '', QBProductId: ''}], init);



  useEffect(() => {
    setCurrentStep(4)

    fetchData("select * from item", setProducts, "Item", setErrorMsg)
    fetchData("select * from account where AccountType = 'Accounts Receivable'", setAccountList, "Account", setErrorMsg)
    fetchData("select * from class", setClasses, "Class", setErrorMsg)

    const listMemberShipLevels = async () => {
      try{
        const membershipLevels = await getMembershipLevels('221748')
        setMembershipLevels(membershipLevels.map(level => level.Name).sort((a, b) => a.localeCompare(b)))
      }
      catch (e){
        setMembershipLevels([]);
        setErrorMsg(e.response.data.error)
      }
    }

    const listEventTags = async () => {
      try{
        const eventTags = await getEventTags('221748')
        setEventTags([... new Set(eventTags.data.Events.map(event => event.Tags).flat().sort((a, b) => a.localeCompare(b)))])
      }
      catch (e){
        setMembershipLevels([]);
        setErrorMsg(e.response.data.error)
      }
    }

    const listProductTags = async () => {
      try{
        const productTags = await getProductTags('221748')
        setProductTags([... new Set(productTags.data.map(productTag => productTag.Tags).flat().sort((a, b) => a.localeCompare(b)))])
      }
      catch (e){
        setMembershipLevels([]);
        setErrorMsg(e.response.data.error)
      }
    }

    listMemberShipLevels()
    listEventTags()
    listProductTags()
  }, []);

  const handleChange = () => {
    setHasClasses(!hasClasses)
  }
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

  const handleMapping = (type, payload, fieldName) => {
    switch(fieldName) {
      case "membership":
        dispatchMembershipMapping({type, payload});
        break;
      case "event":
        dispatchEventMapping({type, payload});
        break;
      case "store":
        dispatchOnlineStoreMapping({type, payload});
        break;
      default:
        throw new Error("No field name found")
    }

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
          <div className="input-group mb-3" defaultValue={"Choose Receivable Account"} style={{maxWidth: '500px'}}>
            <label className="input-group-text" htmlFor="inputAccountsReceivable"><i className={'bi bi-receipt'}></i></label>
            <select className="form-select" id="inputAccountsReceivable" defaultValue={""} onChange={handleAccountSelection}>
              <option value={""} disabled={true}>Choose Receivable Account</option>
              {accountList.map(account => {
                return <option key={account.Id} value={account.Id}>{account.Name}</option>
              })}
            </select>
          </div>
        </div>
        <div className={'quickbooks-class mb-5'} >
          <h6>QuickBooks Classes</h6>
          <p className={'mb-3 mt-2'}>Please select weather you want to enable QuickBooks Classes</p>
          <div className="form-check form-check-inline">
            <input className="form-check-input" id={"inlineRadio1"} type="radio" name="options" value="no" checked={!hasClasses} onChange={handleChange} />
            <label className="form-check-label" htmlFor="inlineRadio1">No</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" id={"inlineRadio2"} type="radio" name="options" value="yes" checked={hasClasses} onChange={handleChange}/>
              <label className="form-check-label"  htmlFor="inlineRadio2">Yes</label>
          </div>
        </div>
        <div className={'default product'} >
          <div className={'membership-level-table'}>
            <h6>Default Membership Level Mapping</h6>
            <p className={'mb-3 mt-2'}>Map your WildApricot membership levels to one of your products by selecting a QuickBooks product from the drop down</p>
            <DefaultMappingTable classesList={hasClasses ? classes : undefined} headers={["QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} data={products} mappingOptions={products}/>
          </div>
        </div>
        <div className={'membership-level-table mb-4'}>
          <h6>Alternate Membership Level Mapping</h6>
          <p className={'mb-3 mt-2'}>Map your WildApricot membership levels to one of your products by selecting a QuickBooks product from the drop down</p>
          <AlternateMappingTable mappingData={membershipLevelMappingList} classesList={hasClasses ? classes : undefined} onMappingChange={(actionType, actionPayload) => handleMapping(actionType, actionPayload, "membership")} headers={["Membership Level", "QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} data={membershipLevels} mappingOptions={products}/>
        </div>
        <div className={'default product'} >
          <div className={'membership-level-table'}>
            <h6>Default Event Registration Mapping</h6>
            <p className={'mb-3 mt-2'}>Map your WildApricot membership levels to one of your products by selecting a QuickBooks product from the drop down</p>
            <DefaultMappingTable classesList={hasClasses ? classes : undefined} headers={["QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} data={products} mappingOptions={products}/>
          </div>
        </div>
        <div className={'membership-level-table mb-4'}>
          <h6>Alternate Event Registration Mapping</h6>
          <p className={'mb-3 mt-2'}>Map your WildApricot events to one of your products by selecting a QuickBooks product from the drop down</p>
          <AlternateMappingTable classesList={hasClasses ? classes : undefined} onMappingChange={(actionType, actionPayload) => handleMapping(actionType, actionPayload, "event")} headers={["Event Tag", "QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} data={eventTags} mappingOptions={products} mappingData={eventMappingList}/>
        </div>
        <div className={'default product'} >
          <div className={'membership-level-table'}>
            <h6>Default Online Store Mapping</h6>
            <p className={'mb-3 mt-2'}>Map your WildApricot membership levels to one of your products by selecting a QuickBooks product from the drop down</p>
            <DefaultMappingTable classesList={hasClasses ? classes : undefined} headers={["QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} data={products} mappingOptions={products}/>
          </div>
        </div>
        <div className={'membership-level-table'}>
          <h6>Alternate Online Store Mapping</h6>
          <p className={'mb-3 mt-2'}>Map your WildApricot online stores to one of your products by selecting a QuickBooks product from the drop down</p>
          <AlternateMappingTable classesList={hasClasses ? classes : undefined} onMappingChange={(actionType, actionPayload) => handleMapping(actionType, actionPayload, "store")} headers={["Product Tag", "QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} data={productTags} mappingOptions={products} mappingData={onlineStoreMappingList}/>
        </div>
        <div className="mt-4">
          <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/customer-information')}>Back</button>
          <button className={"btn-success"} disabled={false} onClick={handleSubmission}>Next</button>
        </div>
      </div>
    </main>
  )
}