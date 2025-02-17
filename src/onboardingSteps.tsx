import {JSX, ReactElement} from "react";
import {CreatMakeAccountPage} from "./pages/create-account-page/CreatMakeAccount.tsx";
import {CreateConnectionsPage} from "./pages/create-connections-page/CreateConnections.tsx";
import {GeneralInformationPage} from "./pages/general-information-page/GeneralInformationPage.tsx";
import {CustomerInformationPage} from "./pages/customer-info-page/CustomerInformationPage.tsx";
import {InvoiceConfigPage} from "./pages/invoice-configuration-page/InvoiceConfigPage.tsx";
import {PaymentConfigPage} from "./pages/payment-config-page/PaymentConfigPage.tsx";
import {DonationConfigPage} from "./pages/donation-config-page/DonationConfigPage.tsx";
import {SchedulingPage} from "./pages/scheduling-page/SchedulingPage.tsx";
import {CloneScenariosPage} from "./pages/clone-scenarios-page/CloneScenariosPage.tsx";


export interface IStep {
  title: string,
  subTitle: string,
  endpoint: string,
  isCompleted?: boolean,
  component: ReactElement
}

export const ONBOARDING_STEPS: IStep[] = [
  {
    title: "Create Make account",
    subTitle: "Sign up at Make.com",
    endpoint: "/",
    component: <CreatMakeAccountPage/>
  },
  {
    title: "Create Connections",
    subTitle: "Create your app connections",
    endpoint: "/create-connections",
    component: <CreateConnectionsPage/>

  },
  {
    title: "General Information",
    subTitle: "Provide your company information",
    endpoint: "/general-information",
    component: <GeneralInformationPage/>

  },
  {
    title: "Customer Information",
    subTitle: "Map your field names",
    endpoint: "/customer-information",
    component: <CustomerInformationPage/>

  },
  {
    title: "Invoice Configuration",
    subTitle: "Configure your invoices",
    endpoint: "/invoice-config",
    component: <InvoiceConfigPage/>

  },
  {
    title: "Payment Configuration",
    subTitle: "Configure your payments",
    endpoint: "/payment-config",
    component: <PaymentConfigPage/>

  },
  {
    title: "Donation Configuration",
    subTitle: "Configure your donations",
    endpoint: "/donation-config",
    component: <DonationConfigPage/>
  },
  {
    title: "Scheduling",
    subTitle: "Schedule your workflows",
    endpoint: "/job-scheduling",
    component: <SchedulingPage/>
  },
  {
    title: "Review and Clone",
    subTitle: "Automate your work flows",
    endpoint: "/clone-scenarios",
    component: <CloneScenariosPage/>
  },
]