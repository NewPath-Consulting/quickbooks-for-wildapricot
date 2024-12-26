import './CustomerInformation.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {getContactInfo, getWildApricotAccounts} from "../../services/api/wild-apricot-api/accountsService.ts";

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
  displayName: string,
  userId ?: number
}

export const CustomerInformationPage = () => {
  const {onBoardingData, setCurrentStep, updateData} = useOnBoarding();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

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
    displayName: "",
    userId: 0
  })

  const [formErrors, setFormErrors] = useState<ICustomerInfo>({
    address: "",
    city: "",
    country: "",
    displayName: "",
    email: "",
    firstName: "",
    lastName: "",
    organization: "",
    phoneNumber: "",
    state: ""
  })

  const handleData = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setFormErrors({
      ...formErrors,
      [name]: ""
    })

  }

  useEffect(() => {
    setCurrentStep(3)

    const getAccountInfo = async() => {
      try{
        const userInfo = await getWildApricotAccounts();
        const { Id } = userInfo.data[0]
        // const contactInfo = await getContactInfo(Id);
        // const {FirstName, LastName, Email, Organization, DisplayName} = contactInfo.data
        setFormData({
          ...formData,
          userId: Id
        })
      }
      catch(e){
        setErrorMsg("Error loading data from Wild Apricot: Invalid Token")
        console.log(e)
      }
    }

    getAccountInfo();
  }, []);

  const appendToDisplayName = (field: string) => {
    setFormData({
      ...formData,
      displayName: formData.displayName + field
    })
  }

  const validateForm = () => {
    const errors: ICustomerInfo = {
      address: "",
      city: "",
      country: "",
      displayName: "",
      email: "",
      firstName: "",
      lastName: "",
      organization: "",
      phoneNumber: "",
      state: "",
    };
    if (!formData.firstName.trim()) errors.firstName = "First name is required.";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
    if (!formData.organization.trim()) errors.organization = "Organization is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email is required.";
    if (!formData.phoneNumber.trim() || !/^\d+$/.test(formData.phoneNumber)) errors.phoneNumber = "Phone number must be numeric.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.country.trim()) errors.country = "Country is required.";
    if (!formData.displayName.trim()) errors.displayName = "Display name is required.";
    if (!formData.address.trim()) errors.address = "Street Address is required.";
    if (!formData.state.trim()) errors.state = "State is required.";
    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.values(errors).some(value => value.trim() !== "")) {
      setFormErrors(errors);
    }
    else {
      updateData({customerInfo: formData});
      console.log(onBoardingData);
    }
  };

  return (
    <main>
      <header>
        <h2>Customer Information</h2>
        <p>Provide your company details to personalize and streamline your integration experience.</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
          <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
      <form onSubmit={handleSubmit} className={Object.values(formErrors).some(value => value.trim() !== "") ? 'was-validated' : ''} noValidate={true}>

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
                <input type="text" name={'organization'} required onChange={handleData} value={formData.organization} className="form-control  " id="organization"/>
                <div id="validationServer05Feedback" className="invalid-feedback">
                  {formErrors.organization}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="first-name" className=" ">First Name</label>
                  <input type="text" name={"firstName"} required onChange={handleData} value={formData.firstName} className="form-control" id="first-name"/>
                  <div id="validationServer05Feedback" className="invalid-feedback">
                    {formErrors.firstName}
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="last-name" className=" ">Last Name</label>
                  <input type="text" name={"lastName"} required onChange={handleData} value={formData.lastName} className="form-control" id="last-name"/>
                  <div id="validationServer05Feedback" className="invalid-feedback">
                    {formErrors.lastName}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <h6>Contact Info <i className={'bi bi-send-fill ms-2'}></i></h6>
              <p>Provide your contact info</p>
            </div>
            <div className="col-md-6 mb-3">
              <div className="mb-3">
                <label htmlFor="email" className=" ">Email Address</label>
                <input type="text" name={"email"} onChange={handleData} required value={formData.email} className="form-control" id="email"/>
                <div id="validationServer05Feedback" className="invalid-feedback">
                  {formErrors.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="phone-number" className=" ">Phone Number</label>
                <input type="text" name={"phoneNumber"} required onChange={handleData} value={formData.phoneNumber} className="form-control" id="phone-number"/>
                <div id="validationServer05Feedback" className="invalid-feedback">
                  {formErrors.phoneNumber}
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <h6>Location Info <i className={'bi bi-geo-alt-fill ms-2'}></i></h6>
              <p>Provide your company location</p>
            </div>
            <div className="col-md-6 mb-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="address" className=" ">Street Address</label>
                  <input type="text" name={"address"} required onChange={handleData} value={formData.address} className="form-control" id="address"/>
                  <div id="validationServer05Feedback" className="invalid-feedback">
                    {formErrors.address}
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="country" className=" ">Country</label>
                  <input type="text" name={"country"} required onChange={handleData} value={formData.country} className="form-control" id="country"/>
                  <div id="validationServer05Feedback" className="invalid-feedback">
                    {formErrors.country}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="state" className=" ">State</label>
                  <input type="text" name={"state"} required={true} onChange={handleData} value={formData.state} className="form-control" id="state"/>
                  <div id="validationServer05Feedback" className="invalid-feedback">
                    {formErrors.state}
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="city" className=" ">City</label>
                  <input type="text" name={"city"} required={true} onChange={handleData} value={formData.city} className="form-control" id="city"/>
                  <div id="validationServer05Feedback" className="invalid-feedback">
                    {formErrors.city}
                  </div>
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
                <input type="text" name={"displayName"} required onChange={handleData} className="form-control" value={formData.displayName} id="display-name" placeholder={"Display Name"}/>
                <div id="validationServer05Feedback" className="invalid-feedback">
                  {formErrors.displayName}
                </div>
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
          <button className={"btn-success"} disabled={false} type={"submit"}>Next</button>
        </div>
      </form>

    </main>
  )
}