import * as React from "react";
import './Scheduling.css'
import {useState} from "react";
interface SchedulingComponentProps {
  title: string
}

export const SchedulingComponent = ({ title }: SchedulingComponentProps) => {

  const [jobType, setJobType] = useState("")

  const renderForm = () => {
    if(jobType == 'Manual'){
      return (
        <>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor={`${title.toLowerCase()}-manual-start-input`} className="form-label">Manual Start Time</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text" id="basic-addon1"><i className={'bi bi-calendar'}></i></span>
                <input id={`${title.toLowerCase()}-manual-start-input`} type="date" className="form-control" placeholder="Choose Date" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor={`${title.toLowerCase()}-manual-end-input`} className="form-label">Manual End Time</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text" id="basic-addon1"><i className={'bi bi-calendar'}></i></span>
                <input id={`${title.toLowerCase()}-manual-end-input`} type="date" className="form-control" placeholder="Choose Date" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor={`${title.toLowerCase()}-doc-input`} className="form-label">Manual {title} {title.toLowerCase() === 'payment' ? 'ID' : 'Doc'} #</label>
              <div className="input-group input-group-sm">
                <input id={`${title.toLowerCase()}-doc-input`} type="text" className="form-control" placeholder="Enter here..." aria-label="Username" aria-describedby="basic-addon1" />
              </div>
            </div>
          </div>
        </>
      )

    }

    else if(jobType == 'Scheduled'){
      return (
        <>
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <label htmlFor={`${title.toLowerCase()}-time-periods-input`} className="form-label">Time Period for each Run</label>
              <select id={`${title.toLowerCase()}-time-periods-input`} className={'form-select'} defaultValue={""}>
                <option value={""}>Choose time period ...</option>
                <option value={"Daily"}>Daily</option>
                <option value={"Weekly"}>Weekly</option>
                <option value={"Monthly"}>Monthly</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor={`${title.toLowerCase()}-num-periods-input`} className="form-label"># of Time Periods</label>
              <input id={`${title.toLowerCase()}-num-periods-input`} type="number" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="col-md-6">
              <label htmlFor={`${title.toLowerCase()}-weekly-input`} className="form-label">Weekly: Day of week to start run</label>
              <select id={`${title.toLowerCase()}-weekly-input`} className={'form-select'} defaultValue={""}>
                <option value={""}>Choose day of the week ...</option>
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => <option key={index} value={day}>{day}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor={`${title.toLowerCase()}-monthly-input`} className="form-label">Monthly: Day of month to start run</label>
              <input id={`${title.toLowerCase()}-monthly-input`} type="number" className="form-control" max={31} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className="scheduling-container">
      <h6>{title} Scheduling</h6>
      <div className="col-md-5">
        <label htmlFor={`${title.toLowerCase()}-job-type-input`} className="form-label">Job Scheduling Type</label>
        <select id={`${title.toLowerCase()}-job-type-input`} className={'form-select'} defaultValue={""} onChange={(e) => setJobType(e.target.value)} value={jobType}>
          <option value={""}>Choose job type ...</option>
          <option value={"Manual"}>Manual</option>
          <option value={"Scheduled"}>Scheduled</option>
        </select>
      </div>
      {renderForm()}
    </div>
  )
}