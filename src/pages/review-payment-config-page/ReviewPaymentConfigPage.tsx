import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import './ReviewPaymentConfig.css'
import {useEffect} from "react";
import {ReviewMappingTable} from "../../components/review-mapping-table/ReviewMappingTable.tsx";

export const ReviewPaymentConfigPage = () => {
  const { onBoardingData } = useOnBoarding()

  return (
    <div className={'pt-4 pb-3 ps-1 review-page-container'}>
      <div className={'mb-2'}>
        <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Payment Default Mapping</p>
        <div className={'overflow-x-auto'}>
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
            {(onBoardingData.accountReceivable?.accountName || onBoardingData.qbDepositAccount?.accountName) ? (
              <tr>
                <td>{onBoardingData.accountReceivable?.accountName || ""}</td>
                <td>{onBoardingData.qbDepositAccount?.accountName || ""}</td>
              </tr>
            ) : (
              <tr>

              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      <p className={'mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Payment Alternate Mapping</p>
      <ReviewMappingTable mappingList={onBoardingData.paymentMappingList} headers={["WA Tender", "QB Tender"]} columns={["WATender", "QBTender"]}/>
    </div>
  )
}