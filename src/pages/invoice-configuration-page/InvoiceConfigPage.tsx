import './InvoiceConfig.css'
import * as React from "react";
import {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {getMembershipLevels} from "../../services/api/wild-apricot-api/membershipService.ts";
import {useNavigate} from "react-router-dom";
import {fetchData} from "../../services/fetchData.ts";
import {DefaultMappingTable} from "../../components/default-mapping-table/DefaultMappingTable.tsx";
import {getEventTags} from "../../services/api/wild-apricot-api/eventsService.ts";
import {getProductTags} from "../../services/api/wild-apricot-api/storeService.ts";
import {tableColumns} from "../../components/alternate-mapping-table/tableColumns.ts";
import AlternateMappingTable from "../../components/alternate-mapping-table/AlternateMappingTable.tsx";
import {invoiceTableReducer} from "../../hooks/tableReducer.ts";
export interface InvoiceMapping {
  WAFieldName ?: string,
  QBProduct ?: string,
  QBProductId ?: string,
  IncomeAccount ?: string,
  class ?: string,
  classId ?: string
}

export const InvoiceConfigPage = () => {
  const { onBoardingData, setCurrentStep, updateData } = useOnBoarding()

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [accountReceivable, setAccountReceivable] = useState(onBoardingData.accountReceivable ?? {accountId: "", accountName: ""});
  const [membershipLevels, setMembershipLevels] = useState([]);
  const [products, setProducts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [hasClasses, setHasClasses] = useState(onBoardingData.hasClasses || false)
  const accountsReceivableErrorMsg = "Must choose an invoice account"
  const [eventTags, setEventTags] = useState([]);
  const [productTags, setProductTags] = useState([]);

  const [defaultMembershipProduct, setDefaultMembershipProduct] = useState<InvoiceMapping>(onBoardingData.defaultMembershipProduct ?? {QBProduct: "", QBProductId: "", IncomeAccount: "", class: "", classId: ""});
  const [defaultEventProduct, setDefaultEventProduct] = useState<InvoiceMapping>(onBoardingData.defaultEventProduct ?? {QBProduct: "", QBProductId: "", IncomeAccount: "", class: "", classId: ""});
  const [defaultStoreProduct, setDefaultStoreProduct] = useState<InvoiceMapping>(onBoardingData.defaultStoreProduct ?? {QBProduct: "", QBProductId: "", IncomeAccount: "", class: "", classId: ""});
  const [manualInvoiceMapping, setManualInvoiceMapping] = useState<InvoiceMapping>(onBoardingData.manualInvoiceMapping ?? {QBProduct: "", QBProductId: "", IncomeAccount: "", class: "", classId: ""});

  const [membershipLevelMappingList, dispatchMembershipMapping] = useReducer(invoiceTableReducer, onBoardingData.membershipLevelMappingList ?? [{ WAFieldName: '', QBProduct: '', QBProductId: '', IncomeAccount: '', class: '', classId: ''}]);
  const [eventMappingList, dispatchEventMapping] = useReducer(invoiceTableReducer, onBoardingData.eventMappingList ?? [{ WAFieldName: '', QBProduct: '', QBProductId: '', IncomeAccount: '', class: '', classId: ''}]);
  const [onlineStoreMappingList, dispatchOnlineStoreMapping] = useReducer(invoiceTableReducer, onBoardingData.onlineStoreMappingList ?? [{ WAFieldName: '', QBProduct: '', QBProductId: '', IncomeAccount: '', class: '', classId: ''}]);

  const latestDataRef = useRef({}); // Ref to store latest data


  useEffect(() => {
    setCurrentStep(4)

    fetchData("select * from item", setProducts, "Item", setErrorMsg)
    fetchData("select * from account where AccountType = 'Accounts Receivable'", setAccountList, "Account", setErrorMsg)
    fetchData("select * from class", setClasses, "Class", setErrorMsg)

    const fetchWithErrorHandling = async (
      fetchFn: () => Promise<any>,
      setter: (data: any[]) => void
    ) => {
      try {
        const result = await fetchFn();
        setter(result);
      } catch (e) {
        setter([]);
        setErrorMsg(e.response.data.error);
      }
    };

    // Fetch all WA data in parallel
    Promise.all([
      fetchWithErrorHandling(
        async () => {
          const response = await getMembershipLevels('221748');
          return response.map(level => level.Name).sort((a, b) => a.localeCompare(b));
        },
        setMembershipLevels
      ),
      fetchWithErrorHandling(
        async () => {
          const response = await getEventTags('221748');
          return [...new Set(response.data.Events.map(event => event.Tags).flat())]
            .sort((a, b) => a.localeCompare(b));
        },
        setEventTags
      ),
      fetchWithErrorHandling(
        async () => {
          const response = await getProductTags('221748');
          return [...new Set(response.data.map(productTag => productTag.Tags).flat())]
            .sort((a, b) => a.localeCompare(b));
        },
        setProductTags
      )
    ]);
  }, []);

  const invoiceConfigurations = useMemo(() => [
    {
      invoiceOrderType: "Membership",
      defaultInvoiceMapping: defaultMembershipProduct,
      alternateInvoiceMapping: membershipLevelMappingList
    },
    {
      invoiceOrderType: "Events",
      defaultInvoiceMapping: defaultEventProduct,
      alternateInvoiceMapping: eventMappingList
    },
    {
      invoiceOrderType: "Online Store",
      defaultInvoiceMapping: defaultStoreProduct,
      alternateInvoiceMapping: onlineStoreMappingList
    },
    {
      invoiceOrderType: "Manual Invoice",
      defaultInvoiceMapping: manualInvoiceMapping,
      alternateInvoiceMapping: []
    }
  ], [
    defaultMembershipProduct,
    membershipLevelMappingList,
    defaultEventProduct,
    eventMappingList,
    defaultStoreProduct,
    onlineStoreMappingList,
    manualInvoiceMapping
  ]);

  const updateInvoiceData = useCallback(() => {
    updateData({
      invoiceConfigurations,
      membershipLevelMappingList,
      eventMappingList,
      onlineStoreMappingList,
      defaultEventProduct,
      defaultMembershipProduct,
      defaultStoreProduct,
      accountReceivable,
      manualInvoiceMapping
    });

  }, [
    invoiceConfigurations,
    membershipLevelMappingList,
    eventMappingList,
    onlineStoreMappingList,
    defaultEventProduct,
    defaultMembershipProduct,
    defaultStoreProduct,
    accountReceivable,
    manualInvoiceMapping
  ]);

  useEffect(() => {
    updateInvoiceData();
  }, [updateInvoiceData]);

  const handleChange = () => {
    updateData({hasClasses: !hasClasses})
    setHasClasses(!hasClasses)
  }
  const handleAccountSelection = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const accountId = selectedOption.value; // option's value
    const accountName = selectedOption.text;  // option's name (text inside <option>)

    setAccountReceivable({accountId, accountName});

    if(errorMsg === accountsReceivableErrorMsg){
      setErrorMsg('');
    }
  }

  const handleSubmission = () => {
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

  const handleDefaultMapping = (payload: InvoiceMapping, fieldName) => {
    switch(fieldName) {
      case "membership":
        setDefaultMembershipProduct(prev => ({
          ...prev,
          ...payload, // Modify only QBProduct
        }))
        break;
      case "event":
        setDefaultEventProduct(prev => ({
          ...prev,
          ...payload, // Modify only QBProduct
        }))
        break;
      case "store":
        setDefaultStoreProduct(prev => ({
          ...prev,
          ...payload, // Modify only QBProduct
        }))
        break;
      case "manual":
        setManualInvoiceMapping(prev => ({
          ...prev,
          ...payload, // Modify only QBProduct
        }))
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
          <div className="input-group mb-3" style={{maxWidth: '500px'}}>
            <label className="input-group-text" htmlFor="inputAccountsReceivable"><i className={'bi bi-receipt'}></i></label>
            <select className="form-select" id="inputAccountsReceivable" value={accountReceivable.accountId} onChange={handleAccountSelection}>
              <option value={""}>Choose Receivable Account</option>
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
            <DefaultMappingTable<InvoiceMapping> classesList={hasClasses ? classes : undefined} headers={["QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]}  defaultData={defaultMembershipProduct} QBProducts={products} onMappingChange={(payload) => handleDefaultMapping(payload, "membership")}/>
          </div>
        </div>
        <div className={'membership-level-table mb-4'}>
          <h6>Alternate Membership Level Mapping</h6>
          <p className={'mb-3 mt-2'}>Map your WildApricot membership levels to one of your products by selecting a QuickBooks product from the drop down</p>
          <AlternateMappingTable columns={[...tableColumns.membershipLevels, ...(hasClasses ? tableColumns.classes : [])]} onMappingChange={(actionType, actionPayload) => handleMapping(actionType, actionPayload, "membership")} mappingData={membershipLevelMappingList} data={{products, membershipLevels, classes}}/>
        </div>
        <div className={'default product'} >
          <div className={'event-registration-table'}>
            <h6>Default Event Registration Mapping</h6>
            <p className={'mb-3 mt-2'}>Map your WildApricot membership levels to one of your products by selecting a QuickBooks product from the drop down</p>
            <DefaultMappingTable<InvoiceMapping> classesList={hasClasses ? classes : undefined} headers={["QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} QBProducts={products} defaultData={defaultEventProduct} onMappingChange={(payload) => handleDefaultMapping(payload, "event")}/>
          </div>
        </div>
        <div className={'event-registration-table mb-4'}>
          <h6>Alternate Event Registration Mapping</h6>
          <p className={'mb-3 mt-2'}>Map your WildApricot events to one of your products by selecting a QuickBooks product from the drop down</p>
          <AlternateMappingTable columns={[...tableColumns.events, ...(hasClasses ? tableColumns.classes : [])]} onMappingChange={(actionType, actionPayload) => handleMapping(actionType, actionPayload, "event")} mappingData={eventMappingList} data={{products, eventTags, classes}}/>
        </div>
        <div className={'default product'} >
          <div className={'online-store-table'}>
            <h6>Default Online Store Mapping</h6>
            <p className={'mb-3 mt-2'}>Map your WildApricot product tags to one of your QuickBooks products by selecting a QuickBooks product from the drop down</p>
            <DefaultMappingTable<InvoiceMapping> classesList={hasClasses ? classes : undefined} headers={["QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} defaultData={defaultStoreProduct} QBProducts={products} onMappingChange={(payload) => handleDefaultMapping(payload, "store")}/>
          </div>
        </div>
        <div className={'online-store-table'}>
          <h6>Alternate Online Store Mapping</h6>
          <p className={'mb-3 mt-2'}>Map your WildApricot online stores to one of your products by selecting a QuickBooks product from the drop down</p>
          <AlternateMappingTable columns={[...tableColumns.onlineStore, ...(hasClasses ? tableColumns.classes : [])]} onMappingChange={(actionType, actionPayload) => handleMapping(actionType, actionPayload, "store")} mappingData={onlineStoreMappingList} data={{products, productTags, classes}}/>
        </div>
        <div className={'default product'} >
          <div className={'manual-invoice-table'}>
            <h6>Manual Invoice Mapping</h6>
            <p className={'mb-3 mt-2'}>This section is used to map your manually created invoices to a QuickBooks product.</p>
            <DefaultMappingTable<InvoiceMapping> classesList={hasClasses ? classes : undefined} headers={["QB Product", "Income Account", ...(hasClasses ? ["Class"] : [])]} defaultData={manualInvoiceMapping} QBProducts={products} onMappingChange={(payload) => handleDefaultMapping(payload, "manual")}/>
          </div>
        </div>
        <div className="mt-4">
          <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/customer-information')}>Back</button>
          <button className={"btn-success"} disabled={false} onClick={handleSubmission}>Next</button>
        </div>
      </div>
    </main>
  )
}
