import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {FirstDraft} from "../../FirstDraft.tsx";
import {ReviewConfigComponent} from "../../components/review-config-component/ReviewConfigComponent.tsx";
import {CustomerInformationPage} from "../customer-info-page/CustomerInformationPage.tsx";
import {ReviewCustomerInfoPage} from "../review-customer-info-page/ReviewCustomerInfoPage.tsx";
import {useNavigate} from "react-router-dom";
import {ReviewPaymentConfigPage} from "../review-payment-config-page/ReviewPaymentConfigPage.tsx";
import {ReviewInvoiceConfigPage} from "../review-invoice-config-page/ReviewInvoiceConfigPage.tsx";
import {ReviewDonationConfigPage} from "../review-donation-config-page/ReviewDonationConfigPage.tsx";
import {
  formatCustomerInfo,
  formatDonationConfig,
  formatInvoiceConfig,
  formatPaymentConfig
} from "../../utils/formatter.ts";
import {InvoiceConfiguration} from "../../typings/InvoiceConfiguration.ts";
import {configurations} from "../../configurations.ts";
import {createDataRecord} from "../../services/api/make-api/dataStructuresService.ts";
import {cloneConfiguration} from "../../utils/handleCloneConfiguration.ts";
import {BlurryOverlay} from "../../components/cloning-animation/BlurryOverlay.tsx";


export const CloneScenariosPage = () => {

  const { setCurrentStep, onBoardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setCurrentStep(7)

    const invoiceConfigurations: InvoiceConfiguration[] = [
      {
        invoiceOrderType: "MembershipApplication",
        defaultInvoiceMapping: onBoardingData.defaultMembershipProduct,
        alternateInvoiceMapping: onBoardingData.membershipLevelMappingList,
        accountReceivable: onBoardingData.accountReceivable
      },
      {
        invoiceOrderType: "MembershipRenewal",
        defaultInvoiceMapping: onBoardingData.defaultMembershipProduct,
        alternateInvoiceMapping: onBoardingData.membershipLevelMappingList,
        accountReceivable: onBoardingData.accountReceivable
      },
      {
        invoiceOrderType: "MembershipLevelChange",
        defaultInvoiceMapping: onBoardingData.defaultMembershipProduct,
        alternateInvoiceMapping: onBoardingData.membershipLevelMappingList,
        accountReceivable: onBoardingData.accountReceivable
      },
      {
        invoiceOrderType: "EventRegistration",
        defaultInvoiceMapping: onBoardingData.defaultEventProduct,
        alternateInvoiceMapping: onBoardingData.eventMappingList,
        accountReceivable: onBoardingData.accountReceivable
      },
      {
        invoiceOrderType: "OnlineStore",
        defaultInvoiceMapping: onBoardingData.defaultStoreProduct,
        alternateInvoiceMapping: onBoardingData.onlineStoreMappingList,
        accountReceivable: onBoardingData.accountReceivable
      },
      {
        invoiceOrderType: "Undefined",
        defaultInvoiceMapping: onBoardingData.manualInvoiceMapping,
        alternateInvoiceMapping: [],
        accountReceivable: onBoardingData.accountReceivable
      }
    ]

    setData(
      {
        ...configurations,
        "Config Last Updated": new Date(),
        ...formatCustomerInfo(onBoardingData.customerInfo),
        ...formatPaymentConfig(onBoardingData.paymentMappingList, onBoardingData.accountReceivable, onBoardingData.qbDepositAccount),
        ...formatDonationConfig({
          defaultDonationConfig: onBoardingData.defaultDonationMapping,
          alternateDonationConfig: onBoardingData.donationMappingList,
          commentName: onBoardingData.donationCommentName,
          campaignName: onBoardingData.donationCampaignName
        }),
        ...formatInvoiceConfig(invoiceConfigurations)
    })

  }, [onBoardingData]);

  const handleCloneConfiguration = async () => {
    try {
      setIsLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      const response = await cloneConfiguration(data);

      console.log(response)
      // Success handling
      setSuccessMsg("Configuration cloned successfully!");
    } catch (error) {
      // Error handling
      setErrorMsg(error.message || "Configuration cloning failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      {/*<BlurryOverlay isLoading={true}/>*/}
      <header>
        <h2>Review and Clone</h2>
        <p>Review all of your data and configurations before automating the integration process. </p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
          <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
      {successMsg && <div style={{fontSize:'13px'}} className="alert alert-success" role="alert">
          <i style={{color: "#245815"}} className={'bi bi-check-circle'}></i> {successMsg}
      </div>}
      <div className={''}>
        <ReviewConfigComponent img={'bi-link-45deg'} title={'Connections'} urlLocation={'/create-connections'}>
        </ReviewConfigComponent>

        <ReviewConfigComponent img={'bi-person'} title={'Customer Information'} urlLocation={'/customer-information'}>
          <ReviewCustomerInfoPage/>
        </ReviewConfigComponent>

        <ReviewConfigComponent img={'bi-credit-card'} title={'Payment Configuration'} urlLocation={'/payment-config'}>
          <ReviewPaymentConfigPage/>
        </ReviewConfigComponent>

        <ReviewConfigComponent img={'bi-file-text'} title={'Invoice Configuration'} urlLocation={'/invoice-config'}>
          <ReviewInvoiceConfigPage/>
        </ReviewConfigComponent>
        <ReviewConfigComponent img={'bi-piggy-bank'} title={'Donation Configuration'} urlLocation={'/donation-config'}>
          <ReviewDonationConfigPage/>
        </ReviewConfigComponent>
      </div>
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/donation-config')}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={handleCloneConfiguration}>{isLoading ? "Cloning..." : "Clone"}</button>
      </div>
    </main>
  )
}