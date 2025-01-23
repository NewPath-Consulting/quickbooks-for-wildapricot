import "./Sidebar.css";
import {steps} from "../../onboardingSteps.ts";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {Link, useNavigate} from "react-router-dom";

const Sidebar: React.FC = () => {
  const { currentStep } = useOnBoarding();
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <ul className="steps">
        <div className={'progress'} style={{height: `${(100/(steps.length-1))*(currentStep-1)}%`}}></div>
        {
          steps.map((step, index) => {
            const isClickable = index + 1 < currentStep
            return (
              <li className={isClickable ? "completed-step" : index + 1 == currentStep  ? "active-step" : ""} key={index}>
                {/*{isClickable ?*/}
                {/*  <Link className="step-number" to={step.endpoint}>*/}
                {/*    {index + 1 < currentStep ? <i style={{fontSize: "1.2em", color: "white"}} className={"bi bi-check"}></i> : index + 1}*/}
                {/*    <div className={`progressing`} style={{ height: `${index + 1 < currentStep ? '45px' : '0px'}` }}/>*/}
                {/*  </Link> :*/}
                {/*  <span className="step-number">*/}
                {/*    {index + 1 < currentStep ? <i style={{fontSize: "1.2em", color: "white"}} className={"bi bi-check"}></i> : index + 1}*/}
                {/*    <div*/}
                {/*      className="progressing"*/}
                {/*      style={{*/}
                {/*        height: `${index + 1 < currentStep ? '45px' : '0px'}`,*/}
                {/*      }}*/}
                {/*    />*/}
                {/*  </span>*/}
                {/*}*/}

                <div
                  className={`step-number ${isClickable ? "clickable" : ""}`}
                  onClick={() => step.endpoint && navigate(step.endpoint)} // Use navigate() for routing
                >
                  {index + 1 < currentStep ? (
                    <i
                      style={{ fontSize: "1.2em", color: "white" }}
                      className={"bi bi-check"}
                    ></i>
                  ) : (
                    index + 1
                  )}
                  {/* Always render the progressing div */}
                  <div
                    className="progressing"
                    style={{
                      height: `${index + 1 < currentStep ? "45px" : "0px"}`,
                    }}
                  />
                </div>

                <div >
                  <p className={`step-title ${index + 1 <= currentStep ? 'bold-step-title' : ''}`}>{step.title}</p>
                  <p className={`step-sub-title ${index + 1 <= currentStep ? 'bold-step-title' : ''}`}>{step.subTitle}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </aside>
  );
};

export default Sidebar;
