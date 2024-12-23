import './CustomerInformation.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export interface ICustomerInfo {
  firstName: string,
  lastName: string,
  organization: string,
  address: string,
  city: string,
  country: string,
  email: string,
  phoneNumber: string,
  state: string
  displayName: string
}

export const CustomerInformationPage = () => {
  const {onBoardingData, setCurrentStep} = useOnBoarding();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ICustomerInfo>({
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    organization: "",
    phoneNumber: "",
    state: "",
    address: "",
    displayName: ""
  })

  const handleData = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  useEffect(() => {
    setCurrentStep(3)
  }, []);

  const appendToDisplayName = (field: string) => {
    setFormData({
      ...formData,
      displayName: formData.displayName + field
    })
  }

  return (
    <main>
      <header>
        <h2>Customer Information</h2>
        <p>Provide your company details to personalize and streamline your integration experience.</p>
      </header>

      <form>
        <h5 className={'mb-4'}>Wild Apricot Information</h5>

        <div className={"form-content"}>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <h6>Company Info <i className={'bi bi-person-circle ms-2'}></i></h6>
              <p>Provide your company info</p>
            </div>
            <div className="col-md-6 mb-3">
              <div className="mb-3">
                <label htmlFor="organization" className=" ">Organization</label>
                <input type="text" name={'organization'} onChange={handleData} value={formData.organization} className="form-control" id="organization"/>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="first-name" className=" ">First Name</label>
                  <input type="text" name={"firstName"} onChange={handleData} value={formData.firstName} className="form-control" id="first-name"/>
                </div>
                <div className="col">
                  <label htmlFor="last-name" className=" ">Last Name</label>
                  <input type="text" name={"lastName"} onChange={handleData} value={formData.lastName} className="form-control" id="last-name"/>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <h6>Contact Info <i className={'bi bi-send-fill ms-2'}></i></h6>
              <p>Provide your company info</p>
            </div>
            <div className="col-md-6 mb-3">
              <div className="mb-3">
                <label htmlFor="email" className=" ">Email Address</label>
                <input type="text" name={"email"} onChange={handleData} value={formData.email} className="form-control" id="email"/>
              </div>
              <div className="mb-3">
                <label htmlFor="phone-number" className=" ">Phone Number</label>
                <input type="text" name={"phoneNumber"} onChange={handleData} value={formData.phoneNumber} className="form-control" id="phone-number"/>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <h6>Location Info <i className={'bi bi-geo-alt-fill ms-2'}></i></h6>
              <p>Provide your company info</p>
            </div>
            <div className="col-md-6 mb-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="address" className=" ">Street Address</label>
                  <input type="text" name={"address"} onChange={handleData} value={formData.address} className="form-control" id="address"/>
                </div>
                <div className="col">
                  <label htmlFor="country" className=" ">Country</label>
                  <input type="text" name={"country"} onChange={handleData} value={formData.country} className="form-control" id="country"/>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="state" className=" ">State</label>
                  <input type="text" name={"state"} onChange={handleData} value={formData.state} className="form-control" id="state"/>
                </div>
                <div className="col">
                  <label htmlFor="city" className=" ">City</label>
                  <input type="text" name={"city"} onChange={handleData} value={formData.city} className="form-control" id="city"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h5 className={"mt-4 mb-4"}>Quickbooks Information</h5>
        <div className="form-content">
          <div className="row ">
            <div className="col-md-6 mb-3">
              <h6>Display Name</h6>
              <p>Construct name using your Wild Apricot fields below</p>
            </div>
            <div className="col-md-6 mb-3">
              <div className="col">
                <input type="text" name={"displayName"} onChange={handleData} className="form-control" value={formData.displayName} id="display-name" placeholder={"Display Name"}/>
              </div>
            </div>
            <div className="col-md-6">
              <button className={'col me-2 mb-2'} type={'button'} onClick={() => appendToDisplayName(formData.firstName)}>First Name</button>
              <button className={'col me-2 mb-2'} type={'button'} onClick={() => appendToDisplayName(formData.lastName)}>Last Name</button>
              <button className={'col me-2 mb-2'} type={'button'} onClick={() => appendToDisplayName(formData.organization)}>Organization</button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/create-connections')}>Back</button>
          <button className={"btn-success"} disabled={true} type={"submit"} onClick={() => navigate('/customer-information')}>Next</button>
        </div>
      </form>

    </main>
  )
}