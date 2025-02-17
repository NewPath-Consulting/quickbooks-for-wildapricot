import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/navbar/Navbar.tsx";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import {CreatMakeAccountPage} from "./pages/create-account-page/CreatMakeAccount.tsx";
import {CreateConnectionsPage} from "./pages/create-connections-page/CreateConnections.tsx";
import {CustomerInformationPage} from "./pages/customer-info-page/CustomerInformationPage.tsx";
import OAuthSuccess from "./pages/OAuthSuccess.tsx";
import {InvoiceConfigPage} from "./pages/invoice-configuration-page/InvoiceConfigPage.tsx";
import {PaymentConfigPage} from "./pages/payment-config-page/PaymentConfigPage.tsx";
import {DonationConfigPage} from "./pages/donation-config-page/DonationConfigPage.tsx";
import ProgressBar from "./components/progress-bar/ProgressBar.tsx";
import ProgressBar2 from "./components/progress-bar-2/ProgressBar2.tsx";
import {CloneScenariosPage} from "./pages/clone-scenarios-page/CloneScenariosPage.tsx";
import {SchedulingPage} from "./pages/scheduling-page/SchedulingPage.tsx";
import {GeneralInformationPage} from "./pages/general-information-page/GeneralInformationPage.tsx";
import {OnBoardingProvider} from "./contexts/onBoardingContext.tsx";
import {ONBOARDING_STEPS} from "./onboardingSteps.tsx";

//26aba993-f746-44bf-9378-e71a2ffae2e6
function App() {
  return (
    <Router >
      <OnBoardingProvider>
        <div className="app-container">
          <div className={"navbar"}>
            <Navbar/>
          </div>
          <div className="main-layout">
            <Sidebar className={"sidebar"}/>
            <div className="content-area">
              <div className={"progress-bar"}>
                <ProgressBar2 />
              </div>
              <Routes>
                {ONBOARDING_STEPS.map(step => (<Route path={step.endpoint} element={step.component}/>))}
              </Routes>
            </div>
          </div>
        </div>
      </OnBoardingProvider>
    </Router>
  )
}

export default App
