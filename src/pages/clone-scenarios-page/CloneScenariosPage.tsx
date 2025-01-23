import * as React from "react";
import {useEffect} from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {FirstDraft} from "../../FirstDraft.tsx";
import {ReviewConfigComponent} from "../../components/review-config-component/ReviewConfigComponent.tsx";
import {CustomerInformationPage} from "../customer-info-page/CustomerInformationPage.tsx";


export const CloneScenariosPage = () => {

  const { setCurrentStep } = useOnBoarding();

  useEffect(() => {
    setCurrentStep(7)
  }, []);


  return (
    <main>
      <header>
        <h2>Clone Scenarios</h2>
        <p>Easily match donation fields from Wild Apricot to QuickBooks for a smooth and accurate integration process.</p>
      </header>
      <div className={''}>
        <ReviewConfigComponent img={'bi-link-45deg'} title={'Connections'} urlLocation={'/create-connections'}>
          <p>Hello</p>
        </ReviewConfigComponent>
        <ReviewConfigComponent img={'bi-person'} title={'Customer Information'} urlLocation={'/customer-information'}>
          <div className={'pt-3 pb-3'}>
            <i className={'bi bi-building'}></i>
          </div>
        </ReviewConfigComponent>
        <ReviewConfigComponent img={'bi-credit-card'} title={'Payment Configuration'} urlLocation={'/payment-config'}/>
        <ReviewConfigComponent img={'bi-file-text'} title={'Invoice Configuration'} urlLocation={'/invoice-config'}/>
      </div>
    </main>
  )
}