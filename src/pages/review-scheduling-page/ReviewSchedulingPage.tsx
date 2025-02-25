 import * as React from "react";
import {SchedulingData} from "../scheduling-page/SchedulingPage.tsx";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";

interface ReviewSchedulingComponentProps {
  schedulingData: SchedulingData,
  title: string
}
const ReviewSchedulingComponent = ({ schedulingData, title }: ReviewSchedulingComponentProps) => {
  const renderForm = () => {
    if(schedulingData?.jobType == 'Manual'){
      return (
        <>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="mb-1">Manual Start Date</label>
              <div className={'text-field'}>
                <p>{schedulingData?.manualSchedule?.startDate || 'Date'} </p>
              </div>
            </div>
            <div className="col-md-6">
              <label className="mb-1">Manual End Time</label>
              <div className={'text-field'}>
                <p>{schedulingData?.manualSchedule?.endDate || 'Date'} </p>
              </div>
            </div>
            <div className="col-md-6">
              <label className="mb-1">Manual {title} {title.toLowerCase() === 'payment' ? 'ID' : 'Doc'} #</label>
              <div className={'text-field'}>
                <p>{schedulingData?.manualSchedule?.docNumber || 'Doc #'} </p>
              </div>
            </div>
          </div>
        </>
      )

    }

    else if(schedulingData?.jobType == 'Scheduled'){
      return (
        <>
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <label className="mb-1">Time Period for each Run</label>
              <div className={'text-field'}>
                <p>{schedulingData?.scheduledSchedule?.timePeriod || 'Time Period'} </p>
              </div>
            </div>
            <div className="col-md-6">
              <label className="mb-1"># of Time Periods</label>
              <div className={'text-field'}>
                <p>{schedulingData?.scheduledSchedule?.numOfTimePeriods || 'Num of Periods'} </p>
              </div>
            </div>
            <div className="col-md-6">
              <label className="mb-1">Weekly: Day of week to start run</label>
              <div className={'text-field'}>
                <p>{schedulingData?.scheduledSchedule?.dayOfWeek || 'Day of week'} </p>
              </div>
            </div>
            <div className="col-md-6">
              <label className="mb-1">Monthly: Day of month to start run</label>
              <div className={'text-field'}>
                <p>{schedulingData?.scheduledSchedule?.dayOfMonth || 'Day of month'} </p>
              </div>
            </div>
            <div className="col-md-6">
              <label className="mb-1">Start time for run</label>
              <div className={'text-field'}>
                <p>{schedulingData?.scheduledSchedule?.startTime || 'Start time'} </p>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className="scheduling-container">
      <p className={'m-0 fw-regular'} style={{fontSize: '0.9em'}}>{title} Scheduling</p>
      <div className="row">
        <div className="col-md-6 mt-2">
          <label className="mb-1">Job Scheduling Type</label>
          <div className={'text-field'}>
            <p>{schedulingData?.jobType || 'Job Type'} </p>
          </div>
        </div>
      </div>
      {renderForm()}
    </div>
  )
}

export const ReviewSchedulingPage = () => {

  const { onBoardingData } = useOnBoarding()

  return (
    <div className={'pt-4 pb-3 ps-1 review-page-container'}>
      <ReviewSchedulingComponent schedulingData={onBoardingData.invoiceScheduling} title={"Invoice"}/>
      <ReviewSchedulingComponent schedulingData={onBoardingData.paymentScheduling} title={"Payment"}/>
      <ReviewSchedulingComponent schedulingData={onBoardingData.donationScheduling} title={"Donation"}/>
    </div>
  )
}