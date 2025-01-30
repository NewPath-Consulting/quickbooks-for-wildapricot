import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect} from "react";

export const ReviewMappingTable = ({mappingList, headers}) => {

  return (
    <div className={'overflow-x-auto'}>
      <table className={'table table-striped'}>
        <colgroup>
          {
            headers.map((_, index) => {
              return <col key={index} width={`${100/headers.length}%`}/>
            })
          }
        </colgroup>
        <thead>
        <tr>
          {
            headers.map((header, index) => {
              return <th key={index}>{header}</th>
            })
          }
        </tr>
        </thead>
        <tbody>
        {
          mappingList &&
          mappingList.map((value, index) => {
            if(value.WAFieldName && value.QBProduct){
              return (
                <tr key={index}>
                  <td>
                    <div className="td-container">
                      {value.WAFieldName}
                      <i className={'bi bi-arrow-right'}></i>
                    </div>
                  </td>
                  <td>{value.QBProduct}</td>
                  <td>{value.IncomeAccount}</td>
                </tr>
              )
            }
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export const ReviewDefaultMappingTable = ({defaultFields, headers}) => {

  return (
    <div className={'overflow-x-auto'}>
      <table className={'table table-bordered table-striped'}>
        <colgroup>
          {
            headers.map((_, index) => {
              return <col key={index} width={`${100/headers.length}%`}/>
            })
          }
        </colgroup>
        <thead>
        <tr>
          {
            headers.map((header, index) => {
              return <th key={index}>{header}</th>
            })
          }
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{defaultFields?.QBProduct || ""}</td>
          <td>{defaultFields?.IncomeAccount || ""}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}


export const ReviewInvoiceConfigPage = () => {
  const { onBoardingData } = useOnBoarding()

  useEffect(() => {
    console.log(onBoardingData)
  }, [onBoardingData]);

  return (
    <div className={'pt-4 pb-3 ps-1 review-page-container'}>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Default Membership Level Mapping</p>
        <ReviewDefaultMappingTable defaultFields={onBoardingData.defaultMembershipProduct} headers={["QB Product", "Income Account"]}/>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Alternate Membership Level Mapping</p>
        <ReviewMappingTable mappingList={onBoardingData.membershipLevelMappingList} headers={["Membership Level", "QB Product", "Income Account"]} />
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Default Event Mapping</p>
        <ReviewDefaultMappingTable defaultFields={onBoardingData.defaultEventProduct} headers={["QB Product", "Income Account"]}/>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Alternate Event Mapping</p>
        <ReviewMappingTable mappingList={onBoardingData.eventMappingList} headers={["Event Tag", "QB Product", "Income Account"]} />
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Default Online Store Mapping</p>
        <ReviewDefaultMappingTable defaultFields={onBoardingData.defaultStoreProduct} headers={["QB Product", "Income Account"]}/>
      </div>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Alternate Online Store Mapping</p>
        <ReviewMappingTable mappingList={onBoardingData.onlineStoreMappingList} headers={["Product Tag", "QB Product", "Income Account"]} />
      </div>
    </div>
  )
}