import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {FirstDraft} from "./FirstDraft.tsx";
import {Navbar} from "./components/Navbar/Navbar.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import {CreatMakeAccountPage} from "./pages/create-account-page/CreatMakeAccount.tsx";

//26aba993-f746-44bf-9378-e71a2ffae2e6
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar/>
        <div className="main-layout">
          <Sidebar/>
          <div className="content-area">
            <Routes>
              <Route path="/" element={<CreatMakeAccountPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
