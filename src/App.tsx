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

//26aba993-f746-44bf-9378-e71a2ffae2e6
function App() {
  return (
    <Router >
      <div className="app-container">
        <Navbar/>
        <div className="main-layout">
          <Sidebar/>
          <div className="content-area">
            <Routes>
              <Route path="/" element={<CreatMakeAccountPage />} />
              <Route path="/create-connections" element={<CreateConnectionsPage />} />
              <Route path="/customer-information" element={<CustomerInformationPage />} />
              <Route path="/invoice-config" element={<InvoiceConfigPage />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />
              <Route path="/payment-config" element={<PaymentConfigPage />} />
              <Route path="/donation-config" element={<DonationConfigPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
