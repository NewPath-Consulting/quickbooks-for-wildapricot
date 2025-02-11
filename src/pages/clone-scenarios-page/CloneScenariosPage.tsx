import * as React from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {ReviewConfigComponent} from "../../components/review-config-component/ReviewConfigComponent.tsx";
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
import {cloneConfiguration} from "../../utils/handleCloneConfiguration.ts";
import {BlurryOverlay} from "../../components/cloning-animation/BlurryOverlay.tsx";
import {PageTemplate} from "../../components/page-template/PageTemplate.tsx";


export const CloneScenariosPage = () => {

  const { setCurrentStep, onBoardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const errorRef = useRef(null)

  useEffect(() => {
    if (errorMsg && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [errorMsg]);

  useEffect(() => {
    setCurrentStep(8)

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
      setErrorMsg('');
      setSuccessMsg('');
      setIsLoading(true);

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
    <PageTemplate
      title={'Review and Clone'}
      subTitle={'Review all of your data and configurations before automating the integration process. '}
      backUrl={'/job-scheduling'}
      validate={handleCloneConfiguration}
      errorMsg={errorMsg}
    >
      <BlurryOverlay isLoading={isLoading} message={errorMsg ? "Error Occurred!" : successMsg ? successMsg : "Cloning your Workflows"}/>
      {successMsg && <div style={{fontSize:'13px'}} className="alert alert-success" role="alert">
          <i style={{color: "#245815"}} className={'bi bi-check-circle'}></i> {successMsg}
      </div>}
      <div className={''}>

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
    </PageTemplate>

  )
}