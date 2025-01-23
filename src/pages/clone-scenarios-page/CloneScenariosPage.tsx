import * as React from "react";
import {useEffect} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {FirstDraft} from "../../FirstDraft.tsx";
import {ReviewConfigComponent} from "../../components/review-config-component/ReviewConfigComponent.tsx";
import {CustomerInformationPage} from "../customer-info-page/CustomerInformationPage.tsx";
import {ReviewCustomerInfoPage} from "../review-customer-info-page/ReviewCustomerInfoPage.tsx";


export const CloneScenariosPage = () => {

  const { setCurrentStep } = useOnBoarding();

  useEffect(() => {
    setCurrentStep(7)
  }, []);


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

        </ReviewConfigComponent>

        <ReviewConfigComponent img={'bi-file-text'} title={'Invoice Configuration'} urlLocation={'/invoice-config'}>
        </ReviewConfigComponent>
      </div>
    </main>
  )
}