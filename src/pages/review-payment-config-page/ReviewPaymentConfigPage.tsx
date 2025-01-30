import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import './ReviewPaymentConfig.css'
import {useEffect} from "react";

export const ReviewPaymentConfigPage = () => {
  const { onBoardingData } = useOnBoarding()

  useEffect(() => {
    console.log(onBoardingData)
  }, [onBoardingData]);
  return (
    <div className={'pt-4 pb-3 ps-1 review-page-container'}>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Payment Default Mapping</p>
        <table className={'table table-bordered table-striped'}>
          <colgroup>
            <col width={'50%'}/>
            <col width={'50%'}/>
          </colgroup>
          <thead>
          <tr>
            <th>Receivables Account</th>
            <th>Deposit Account</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              {onBoardingData.qbReceivableAccount?.accountName || ""}
            </td>
            <td>
              {onBoardingData.qbDepositAccount?.accountName || ""}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Payment Alternate Mapping</p>
      <table className={'table table-striped'}>
        <colgroup>
          <col width={'50%'}/>
          <col width={'50%'}/>
        </colgroup>
        <thead>
        <tr>
          <th>WA Tender</th>
          <th>QB Tender</th>
        </tr>
        </thead>
        <tbody>
        {
          onBoardingData.paymentMappingList &&
          onBoardingData.paymentMappingList.map((value, index) => {
            if(value.WATender && value.QBTender){
              return (
                <tr key={index}>
                  <td>
                    <div className="td-container">
                      {value.WATender}
                      <i className={'bi bi-arrow-right'}></i>
                    </div>
                  </td>
                  <td>{value.QBTender}</td>
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