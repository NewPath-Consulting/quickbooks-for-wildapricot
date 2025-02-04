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


export const CloneScenariosPage = () => {

  const { setCurrentStep, onBoardingData } = useOnBoarding();
  const navigate = useNavigate();

  const [data, setData] = useState({});

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

    console.log({
      "data": {
        ...formatCustomerInfo(onBoardingData.customerInfo),
        ...formatPaymentConfig(onBoardingData.paymentMappingList, onBoardingData.accountReceivable, onBoardingData.qbDepositAccount),
        ...formatDonationConfig({
          defaultDonationConfig: onBoardingData.defaultDonationMapping,
          alternateDonationConfig: onBoardingData.donationMappingList,
          commentName: onBoardingData.donationCommentName,
          campaignName: onBoardingData.donationCampaignName
        }),
        ...formatInvoiceConfig(invoiceConfigurations)
      }
    })

    setData({
      "data": {
        ...formatCustomerInfo(onBoardingData.customerInfo),
        ...formatPaymentConfig(onBoardingData.paymentMappingList, onBoardingData.accountReceivable, onBoardingData.qbDepositAccount),
        ...formatDonationConfig({
          defaultDonationConfig: onBoardingData.defaultDonationMapping,
          alternateDonationConfig: onBoardingData.donationMappingList,
          commentName: onBoardingData.donationCommentName,
          campaignName: onBoardingData.donationCampaignName
        }),
        ...formatInvoiceConfig(invoiceConfigurations)
      }
    })
  }, [onBoardingData]);

  return (
    <main>
      <header>
        <h2>Review and Clone</h2>
        <p>Review all of your data and configurations before automating the integration process. </p>
      </header>
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
        <button className={"btn-success"} disabled={false} onClick={() => navigate('/clone-scenarios')}>Next</button>
      </div>
    </main>
  )
}