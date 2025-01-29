import * as React from "react";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import './ReviewCustomerInfo.css'


export const ReviewCustomerInfoPage = () => {
  const { onBoardingData } = useOnBoarding()

  return (
    <div className={'pt-4 pb-3 ps-1 review-page-container'}>
      <p className={'m-0 fw-regular'} style={{fontSize: '0.9em'}}>WildApricot Information</p>
      <div className="row mb-2 mt-2">
        <div className="col-lg-3 col-md-4 col-sm-12">
          <label htmlFor="state" className="mb-1">Organization</label>
          <div className={'text-field '}>
            <p>{onBoardingData.customerInfo.organization || 'Organization'} </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <label htmlFor="state" className="mb-1 ">First Name</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.firstName || 'First Name'} </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <label htmlFor="state" className="mb-1 ">Last Name</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.lastName || 'Last Name'} </p>
          </div>
        </div>
      </div>
      <div className="row mb-2 mt-2">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1">Email Address</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.email || 'Email'} </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1 ">Phone Number</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.phoneNumber || 'Phone Number'} </p>
          </div>
        </div>
      </div>
      <div className="row mb-2 mt-2">
        <div className="col-lg-2 col-md-3 col-sm-12">
          <label htmlFor="state" className="mb-1">Street Address</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.address || 'Address'} </p>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12">
          <label htmlFor="state" className="mb-1 ">Country</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.country || 'Country'} </p>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12">
          <label htmlFor="state" className="mb-1 ">State</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.state || 'State'} </p>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12">
          <label htmlFor="state" className="mb-1 ">City</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.city || 'City'} </p>
          </div>
        </div>
        <p className={'mt-3 mb-2 fw-regular'} style={{fontSize: '0.9em'}}>QuickBooks Information</p>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <label htmlFor="state" className="mb-1 ">Display Name</label>
          <div className={'text-field'}>
            <p>{onBoardingData.customerInfo.displayName || 'Display Name'} </p>
          </div>
        </div>
      </div>
    </div>
  )
}