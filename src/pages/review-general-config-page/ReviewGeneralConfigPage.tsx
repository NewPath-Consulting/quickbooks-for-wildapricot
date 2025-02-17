import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import * as React from "react";


export const ReviewGeneralConfigPage = () => {

  const { onBoardingData } = useOnBoarding();

  const displayEmails = (emailAddresses: string[]) => {
    return emailAddresses.map((email, index) => (
      <div
        key={index}
        className="d-inline-block badge text-success rounded-pill me-2 mt-2"
        style={{backgroundColor: '#e1ffe2'}}
      >
        {email}
      </div>
    ));
  };

  return (
    <div className={'pt-4 pb-3 ps-1 review-page-container'}>
      <p className={'m-0 fw-regular'} style={{fontSize: '0.9em'}}>WildApricot Information</p>
      <div className="row mb-2 mt-2 g-2">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1">WA Org Name</label>
          <div className={'text-field '}>
            <p>{onBoardingData.generalInfo.organizationName || 'Org Name'} </p>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1 ">WA Account ID</label>
          <div className={'text-field'}>
            <p>{onBoardingData.generalInfo.accountId || 'Account ID'} </p>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1 ">WA Config Record Name</label>
          <div className={'text-field'}>
            <p>{onBoardingData.generalInfo.recordName || 'Record Name'} </p>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1">Org Time Zone</label>
          <div className={'text-field '}>
            <p>{onBoardingData.generalInfo.timeZone || 'Time Zone'} </p>
          </div>
        </div>
      </div>
      <p className={'mt-3 mb-2 fw-regular'} style={{fontSize: '0.9em'}}>QuickBooks Version Info</p>
      <div className="row mb-2 mt-2 g-2">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1">QuickBooks Country</label>
          <div className={'text-field '}>
            <p>{onBoardingData.generalInfo.QuickBooksCountry || 'Country'} </p>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1 ">QuickBooks Url</label>
          <div className={'text-field'}>
            <p>{onBoardingData.generalInfo.QuickBooksUrl || 'Url'} </p>
          </div>
        </div>
      </div>
      <p className={'mt-3 mb-2 fw-regular'} style={{fontSize: '0.9em'}}>Notification Emails</p>
      <div className="row mb-2 mt-2 g-2">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1">From Email Address</label>
          <div className={'text-field '}>
            <p>{onBoardingData.generalInfo.fromEmailAddress || 'Email Address'} </p>
          </div>

        </div>
        <div className="col-md-12 col-sm-12">
          <label htmlFor="state" className="mb-1 mt-2 d-flex flex-column">To Email Addresses</label>
          {displayEmails(onBoardingData.generalInfo.toEmailAddresses || [])}
        </div>

      </div>
    </div>
  )

}