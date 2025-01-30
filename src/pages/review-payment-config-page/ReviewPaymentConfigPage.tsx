import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import './ReviewPaymentConfig.css'

export const ReviewPaymentConfigPage = () => {
  const { onBoardingData } = useOnBoarding()

  return (
    <div className={'pt-4 pb-3 ps-1 review-page-container'}>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Payment Default Mapping</p>
        <table className={'table table-bordered table-striped'}>
          <thead>
          <tr>
            <th>Receivables Account</th>
            <th>Deposit Account</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              {onBoardingData.qbReceivableAccount?.accountName}
            </td>
            <td>
              {onBoardingData.qbDepositAccount?.accountName}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Payment Alternate Mapping</p>
      <table className={'table table-striped'}>
        <thead>
        <tr>
          <th>WA Tender</th>
          <th>QB Tender</th>
        </tr>
        </thead>
        <tbody>
        {
          onBoardingData.paymentMappingList &&
          onBoardingData?.paymentMappingList.map((value, index) => {
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
          })
        }
        </tbody>
      </table>

    </div>
  )
}