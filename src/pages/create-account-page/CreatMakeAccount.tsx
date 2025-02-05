import './CreateMakeAccount.css'
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {setAuth} from "../../services/httpClient.ts";
import {getUserInfo} from "../../services/api/make-api/usersService.ts";
import {useNavigate} from "react-router-dom";
import {getConnections} from "../../services/api/make-api/connectionsService.ts";
import {teamId} from "../../FirstDraft.tsx";


const steps: {description: string, img: string}[] = [
  {
    description: "Go to make.com and sign up for free",
    img: "make.png"
  },
  {
    description: "Get the pro version subscription",
    img: "payment.png"
  },
  {
    description: "Add an access token to your account",
    img: "token.png"
  },
  {
    description: "Copy the API key and Base URL and paste it into the fields above",
    img: "verify.png"
  }
]

export const CreatMakeAccountPage = () => {
  const {onBoardingData, updateData, setCurrentStep} = useOnBoarding();
  const [authData, setAuthData] = useState({authToken: "", baseUrl: ""})
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAuthData((prevState) => ({
      ...prevState,
      authToken: onBoardingData.authToken.length ? onBoardingData.authToken : prevState.authToken,
      baseUrl: onBoardingData.baseUrl.length ? onBoardingData.baseUrl : prevState.baseUrl,
    }));
  }, [onBoardingData]);

  useEffect(() => {
    setCurrentStep(1)
  }, []);

  const handleVerification = async (e) => {
    e.preventDefault()
    setAuth(authData.authToken);
    console.log(authData.authToken)
    try{
      await getUserInfo();

      updateData({authToken: authData.authToken, baseUrl: authData.baseUrl});
      navigate('create-connections')
    }
    catch(e){
      console.error("Incorrect credentials: " + e.response.data.error);
      setErrorMsg(e.response.data.error)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setAuthData({
      ...authData, [name]: value
    })
  }

  return (
    <main >
      <header>
        <h2>Create a Make account</h2>
        <p>Follow the steps below to create a Make account, then enter your credentials to continue.</p>
      </header>

      <div className="accordion" id="accordionExample">
        {steps.map((step, index) => {
          return (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button collapsed`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={"false"} // True for the first, false for others
                  aria-controls={`collapse${index}`}
                >
                  <div className={"d-flex gap-3 align-items-center"}>
                    <img
                      src={step.img}
                      width={30}
                      alt={"predefined images for each step"}
                    />
                    <div>
                      <p className={"mb-1"} style={{fontWeight: "500", color: "rgb(0, 0, 0, 0.7)", fontSize: "15px"}}>Step {index + 1}</p>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is Step {index + 1}'s content.</strong> It is shown
                  when expanded. You can modify this with any content you like.
                </div>
              </div>
            </div>
          );
        })}
      </div>


      <form className={""} onSubmit={handleVerification}>
        {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
            <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
        </div>}
        <div className="form-floating col-sm-12 mb-3">
          <input type="password" value={authData.authToken} name={"authToken"} className="form-control" id="access-token" onChange={handleChange} placeholder="http/"/>
          <label htmlFor="access-token">Access Token</label>
        </div>
        <div className="form-floating col-sm-12 mb-3">
          <input type="text" className="form-control" id="base-url" name={"baseUrl"} value={authData.baseUrl} placeholder="Base Url" onChange={handleChange}/>
          <label htmlFor="base-url">Base Url</label>
        </div>
        <div className="form-group">
          <button className={"btn-success"} disabled={authData.authToken.length==0 || authData.baseUrl.length == 0} type={"submit"}>Next</button>
        </div>
      </form>
    </main>
  )
}