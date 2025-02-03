import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect} from "react";
import {
  ReviewDefaultMappingTable,
  ReviewMappingTable
} from "../../components/review-mapping-table/ReviewMappingTable.tsx";


export const ReviewInvoiceConfigPage = () => {
  const { onBoardingData } = useOnBoarding()

  useEffect(() => {
    console.log(onBoardingData)
  }, [onBoardingData]);

  return (
    <div className={'pt-4 pb-3 ps-1 review-page-container'}>
      <div className="mb-2">
        <p className="mb-2 fw-regular" style={{fontSize: '0.9em'}}>QB Receivable Account</p>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="basic-addon1">@</span>
            <input type="text" style={{fontSize: '12px'}} className="form-control" disabled value={onBoardingData.accountReceivable?.accountName || ""} placeholder="Username" aria-label="accounts-receivable"/>
          </div>
        </div>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Default Membership Level Mapping</p>
        <ReviewDefaultMappingTable defaultFields={onBoardingData.defaultMembershipProduct} headers={["QB Product", "Income Account", ...(onBoardingData.hasClasses ? ["Class"] : [])]} columns={["QBProduct", "IncomeAccount", ...(onBoardingData.hasClasses ? ["class"] : [])]}/>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Alternate Membership Level Mapping</p>
        <ReviewMappingTable mappingList={onBoardingData.membershipLevelMappingList} headers={["Membership Level", "QB Product", "Income Account", ...(onBoardingData.hasClasses ? ["Class"] : [])]}  columns={["WAFieldName", "QBProduct", "IncomeAccount", ...(onBoardingData.hasClasses ? ["class"] : [])]}/>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Default Event Mapping</p>
        <ReviewDefaultMappingTable defaultFields={onBoardingData.defaultEventProduct} headers={["QB Product", "Income Account", ...(onBoardingData.hasClasses ? ["Class"] : [])]} columns={["QBProduct", "IncomeAccount", ...(onBoardingData.hasClasses ? ["class"] : [])]}/>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Alternate Event Mapping</p>
        <ReviewMappingTable mappingList={onBoardingData.eventMappingList} headers={["Event Tag", "QB Product", "Income Account", ...(onBoardingData.hasClasses ? ["Class"] : [])]} columns={["WAFieldName", "QBProduct", "IncomeAccount", ...(onBoardingData.hasClasses ? ["class"] : [])]} />
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Default Online Store Mapping</p>
        <ReviewDefaultMappingTable defaultFields={onBoardingData.defaultStoreProduct} headers={["QB Product", "Income Account", ...(onBoardingData.hasClasses ? ["Class"] : [])]} columns={["QBProduct", "IncomeAccount", ...(onBoardingData.hasClasses ? ["class"] : [])]}/>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Alternate Online Store Mapping</p>
        <ReviewMappingTable mappingList={onBoardingData.onlineStoreMappingList} headers={["Product Tag", "QB Product", "Income Account", ...(onBoardingData.hasClasses ? ["Class"] : [])]} columns={["WAFieldName", "QBProduct", "IncomeAccount", ...(onBoardingData.hasClasses ? ["class"] : [])]}/>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Manual Invoice Mapping</p>
        <ReviewDefaultMappingTable defaultFields={onBoardingData.manualInvoiceMapping} headers={["QB Product", "Income Account", ...(onBoardingData.hasClasses ? ["Class"] : [])]} columns={["QBProduct", "IncomeAccount", ...(onBoardingData.hasClasses ? ["class"] : [])]}/>
      </div>
    </div>
  )
}