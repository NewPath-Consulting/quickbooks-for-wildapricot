import './CustomerInformation.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect} from "react";

export const CustomerInformationPage = () => {
  const {onBoardingData, setCurrentStep} = useOnBoarding();

  useEffect(() => {
    setCurrentStep(3)
  }, []);

  return (
    <main>
      <header>
        <h2>Customer Information</h2>
        <p>Provide your company details to personalize and streamline your integration experience.</p>
      </header>

      <h5 className={'mb-5'}>Wild Apricot Information</h5>

      <div id={"wa-content"}>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <h6>Company Info <i className={'bi bi-person-circle ms-2'}></i></h6>
              <p>Provide your company info</p>
            </div>
            <div className="col-md-6 mb-3">
              <div className="mb-3">
                <label htmlFor="organization" className=" ">Organization</label>
                <input type="text" className="form-control" id="organization"/>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="first-name" className=" ">First Name</label>
                  <input type="text" className="form-control" id="first-name"/>
                </div>
                <div className="col">
                  <label htmlFor="last-name" className=" ">Last Name</label>
                  <input type="text" className="form-control" id="last-name"/>
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
              <input type="text" className="form-control" id="email"/>
            </div>
            <div className="mb-3">
              <label htmlFor="phone-number" className=" ">Phone Number</label>
              <input type="text" className="form-control" id="phone-number"/>
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
                <input type="text" className="form-control" id="address"/>
              </div>
              <div className="col">
                <label htmlFor="country" className=" ">Country</label>
                <input type="text" className="form-control" id="country"/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="state" className=" ">State</label>
                <input type="text" className="form-control" id="state"/>
              </div>
              <div className="col">
                <label htmlFor="city" className=" ">City</label>
                <input type="text" className="form-control" id="city"/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}