import {PageTemplate} from "../../components/page-template/PageTemplate.tsx";
import {useState} from "react";
import {Clock, CheckCircle, AlertCircle, RotateCw, PlayCircle, UserCheck, BarChart3, Timer} from 'lucide-react';
import './RunScenarios.css'

export const RunScenariosPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | string[]>('')

  const handleSubmission = () => {

  }

  return (
    <PageTemplate
      title={'Run and Test Automation'}
      subTitle={'Test your automation by creating invoices or payments, and then clicking run to see expected results.'}
      validate={handleSubmission}
      errorMsg={errorMsg}
    >
      <div className=" mb-4 gap-3 d-flex flex-wrap justify-content-between">
        <div className="flex-grow-1">
          <strong>Run all workflows</strong>
          <p className="mt-1 text-muted" style={{ fontSize: '14px' }}>
            This will run all automations in this workplace
          </p>
        </div>
        <button
          style={{ backgroundColor: '#0D7CF2', fontSize: '14px' }}
          className="fw-bold pe-2 ps-2 pt-1 pb-1 align-self-center"
        >
          Run Now
        </button>
      </div>
      <div>
        <div className="row g-3">
          <RunScenarioComponent runScenario={() => {}} subTitle={'Configure invoice generation'} title={'Invoices'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.65,0-32-16.15-32-36s14.35-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.24,14.24,0,0,0,64,160C55.18,160,48,169,48,180Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84-1.25-.81-1.23-1-1.12-1.9a4.57,4.57,0,0,1,2-3.67c4.6-3.12,15.34-1.73,19.82-.56A8,8,0,0,0,142,145.86c-2.12-.55-21-5.22-32.84,2.76a20.58,20.58,0,0,0-9,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.34-2.14,3.93-4.6,3.06-15.17,1.56-19.55.36A8,8,0,0,0,109.94,214a61.34,61.34,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.82,20.82,0,0,0,9.19-15.23C154,179,137.49,174.17,127.6,171.31Zm83.09-26.84a8,8,0,0,0-10.23,4.84L188,184.21l-12.47-34.9a8,8,0,0,0-15.07,5.38l20,56a8,8,0,0,0,15.07,0l20-56A8,8,0,0,0,210.69,144.47ZM216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-27.31-8L160,51.31V80Z"
              ></path>
            </svg>
          </RunScenarioComponent>
          <RunScenarioComponent runScenario={() => {}} subTitle={'Configure payment workflow'} title={'Payments'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"
              ></path>
            </svg>
          </RunScenarioComponent>
          <RunScenarioComponent runScenario={() => {}} subTitle={'Configure donations and receipts'} title={'Donations'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z"
              ></path>
            </svg>
          </RunScenarioComponent>
        </div>
      </div>

    </PageTemplate>
  )
}

interface RunScenarioProps {
  title: string,
  subTitle: string
  runScenario: () => void
}

const RunScenarioComponent = ({ title, subTitle, runScenario, children}: RunScenarioProps) => {

  return (
    <div className={'d-flex flex-column'}>
      <div className={'d-flex bg-light justify-content-between align-items-center p-3 border border-1 rounded-3 rounded-bottom-0'}>
        <div className="d-flex align-items-center gap-3">
          <div
          >
            <CheckCircle className={'text-success'} style={{width: '20px'}}/>
            {/*<RotateCw className={'text-info run-scenario-spinner'} style={{width: '20px'}} />*/}
            {/*<AlertCircle className={'text-danger'} style={{width: '20px'}} />*/}
          </div>
          <div className="d-flex flex-column justify-content-center">
            <p className="text-dark fw-semibold" style={{ fontSize: '16px' }}>
              {title}
            </p>
            <p className="text-secondary" >
              {subTitle}
            </p>
          </div>
        </div>
        <p className={'run-scenario-progress text-dark fw-bold text-truncate'}>Not run yet</p>
      </div>
      <div className={'p-3 border border-1 rounded-3 border-top-0 rounded-top-0 d-grid gap-2 text-dark'}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Clock style={{width: '20px'}}/>
            <span className=" small">Avg Duration</span>
          </div>
          <span className="fw-medium">--</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <BarChart3 style={{width: '20px'}} />
            <span className=" small">Success Rate</span>
          </div>
          <span className="fw-medium">--</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <UserCheck style={{width: '20px'}}/>
            <span className=" small">Total Runs</span>
          </div>
          <span className="fw-medium">--</span>
        </div>
      </div>
    </div>
  )
}
