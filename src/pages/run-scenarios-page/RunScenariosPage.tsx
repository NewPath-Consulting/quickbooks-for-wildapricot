import {PageTemplate} from "../../components/page-template/PageTemplate.tsx";
import {useEffect, useState} from "react";
import {Clock, CheckCircle, AlertCircle, RotateCw, PlayCircle, ClipboardCheck, BarChart3, Timer, Calendar} from 'lucide-react';
import './RunScenarios.css'
import {activateScenario, getScenarioDetails, runScenario} from "../../services/api/make-api/scenariosService.ts";

interface ScenarioRun {
  scenarioId: number,
  numOfRuns: number,
  lastRun: string | null,
  isCompleted: boolean,
  isActive: boolean,
  isSuccessful: boolean,
  subTitle: string,
  title: string,
  isRunning: boolean,
  runDuration: number
}
const scenarioObjects: ScenarioRun[] = [
  {
    scenarioId: 3704193,
    numOfRuns: 0,
    lastRun: null,
    isCompleted: false,
    isActive: false,
    isSuccessful: false,
    subTitle: 'Configure invoice generation',
    title: 'Invoices',
    isRunning: false,
    runDuration: 0
  },
  {
    scenarioId: 3704194,
    numOfRuns: 0,
    lastRun: null,
    isCompleted: false,
    isActive: false,
    isSuccessful: false,
    subTitle: "Configure payment workflow",
    title: 'Payments',
    isRunning: false,
    runDuration: 0
  },
  {
    scenarioId: 3704191,
    numOfRuns: 0,
    lastRun: null,
    isCompleted: false,
    isActive: false,
    isSuccessful: false,
    subTitle: 'Configure donations and receipts',
    title: 'Donations',
    isRunning: false,
    runDuration: 0
  }
]

export const RunScenariosPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | string[]>('')
  const [scenarios, setScenarios] = useState<ScenarioRun[]>(scenarioObjects);

  const handleSubmission = () => {

  }

  useEffect(() => {
    const activateScenarios = async () => {
      try {
        const updatedScenarios = await Promise.all(
          scenarios.map(async (scenario) => {
            const scenarioDetails = await getScenarioDetails(scenario.scenarioId);
            return {
              ...scenario,
              isActive: scenarioDetails.data.isActive
            };
          })
        );
        setScenarios(updatedScenarios);
      } catch (error) {
        console.error("Failed to activate scenarios:", error);
      }
    };

    activateScenarios();
    // Empty dependency array means this only runs once on mount
  }, []);


  const runScenarios = async () => {
    setScenarios(current =>
      current.map((s) => ({...s, isRunning: true}))
    );

    setErrorMsg('')
    try {
      // Create a copy of scenarios to work with
      const updatedScenarios = [...scenarios];

      for (let i = 0; i < updatedScenarios.length; i++) {
        // Update single scenario to show it's running
        const scenario = updatedScenarios[i];

        const startTime = Date.now();

        // Activate if needed
        if (!scenario.isActive) {
          const activateResponse = await activateScenario(scenario.scenarioId);
          if (activateResponse.data.isActive) {
            setScenarios(current =>
              current.map((s, index) =>
                index === i ? {...s, isActive: true} : s
              )
            );
            // Update our working copy too
            updatedScenarios[i] = {...updatedScenarios[i], isActive: true};
          }
        }

        // Run the scenario with its specific ID
        if (updatedScenarios[i].isActive) {
          const response = await runScenario(scenario.scenarioId);
          console.log(response.data);

          // Check if successful and update accordingly
          const isSuccessful = response.data?.status === 1; // Adjust based on your API response

          setScenarios(current =>
            current.map((s, index) =>
              index === i ? {
                ...s,
                isRunning: false,
                isCompleted: true,
                isSuccessful,
                numOfRuns: s.numOfRuns + 1,
                lastRun: new Date().toLocaleString(),
                runDuration: Math.round((Date.now()-startTime)/1000)
              } : s
            )
          );
        }
      }
    }
    catch(e){
      setErrorMsg(e.response.data.error)
    }
    finally {
      setScenarios(current =>
        current.map(s => ({ ...s, isRunning: false }))
      );
    }
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
          onClick={runScenarios}
        >
          Run Now
        </button>
      </div>
      <div>
        <div className="row g-3">
          {scenarios.map((scenario, i) => <RunScenarioComponent key={i} scenario={scenario}/>)}
        </div>
      </div>

    </PageTemplate>
  )
}

interface RunScenarioProps {
  scenario: ScenarioRun
}

const RunScenarioComponent = ({ scenario}: RunScenarioProps) => {

  const getStatusIcon = () => {
    if(scenario.isRunning) return <RotateCw className={'text-info run-scenario-spinner'} style={{width: '20px'}} />

    else if(!scenario.isCompleted) return <PlayCircle style={{width: '20px'}}/>

    else if(scenario.isSuccessful) return <CheckCircle className={'text-success'} style={{width: '20px'}}/>

    else return <AlertCircle className={'text-danger'} style={{width: '20px'}} />

  };

  const getStatusText = () => {
    if(scenario.isRunning) return 'Running...'

    else if(!scenario.isCompleted) return 'Not run yet'

    else if(scenario.isSuccessful) return 'Completed'

    else return 'Failed'
  };

  return (
    <div className={'d-flex flex-column'}>
      <div className={`d-flex bg-light justify-content-between align-items-center p-3 border border-1 rounded-3 ${scenario.isCompleted ? 'rounded-bottom-0' : ''}`}>
        <div className="d-flex align-items-center gap-3">
          <div>{getStatusIcon()}</div>
          <div className="d-flex flex-column justify-content-center">
            <p className="text-dark fw-semibold" style={{ fontSize: '16px' }}>
              {scenario.title}
            </p>
            <p className="text-secondary" >
              {scenario.subTitle}
            </p>
          </div>
        </div>
        <div className={'d-flex flex-column'}>
          <p className={'run-scenario-progress text-dark fw-bold text-truncate align-self-end'}>{getStatusText()}</p>
          {scenario.lastRun && !scenario.isRunning && <p className={'run-scenario-progress text-secondary text-truncate'}>Last run: {scenario.lastRun}</p>}
        </div>
      </div>
      {scenario.isCompleted && <div className={'p-3 border border-1 rounded-3 border-top-0 rounded-top-0 d-grid gap-2 text-dark'}>
        <div className="">
          <div className="d-flex align-items-center gap-2">
            <Timer style={{width: '15px'}}/>
            <span className=" small">Avg Duration: {(scenario.runDuration ? scenario.runDuration + 's' : '--')}</span>
          </div>
        </div>

        <div className="">
          <div className="d-flex align-items-center gap-2">
            <ClipboardCheck style={{width: '15px'}}/>
            <span className=" small">Total Runs: {scenario.numOfRuns || '--'}</span>
          </div>
        </div>
      </div>}
    </div>
  )
}
