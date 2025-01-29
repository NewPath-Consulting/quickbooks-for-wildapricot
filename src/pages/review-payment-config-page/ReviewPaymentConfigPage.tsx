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
              Accounts Receivable (A/R)
            </td>
            <td>Checking</td>
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
        <tr>
          <td>
            <div className="td-container">
              Cash
              <i className={'bi bi-arrow-right'}></i>
            </div>
          </td>
          <td>Cash</td>
        </tr>
        <tr>
          <td>
            <div className="td-container">
              Cash
              <i className={'bi bi-arrow-right'}></i>
            </div>
          </td>
          <td>Cash</td>
        </tr>
        <tr>
          <td>
            <div className="td-container">
              Cash
              <i className={'bi bi-arrow-right'}></i>
            </div>
          </td>
          <td>Cash</td>
        </tr>
        </tbody>
      </table>

    </div>
  )
}