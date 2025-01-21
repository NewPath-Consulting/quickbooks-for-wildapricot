import "./Sidebar.css";
import {steps} from "../../onboardingSteps.ts";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {Link} from "react-router-dom";

const Sidebar: React.FC = () => {
  const { currentStep } = useOnBoarding();

  return (
    <aside className="sidebar">
      <ul className="steps">
        <div className={'progress'} style={{height: `${(100/(steps.length-1))*(currentStep-1)}%`}}></div>
        {
          steps.map((step, index) => {
            const isClickable = index + 1 < currentStep
            return (
              <li className={isClickable ? "completed-step" : index + 1 == currentStep  ? "active-step" : ""} key={index}>
                {isClickable ?
                  <Link className="step-number" to={step.endpoint}>
                    {index + 1 < currentStep ? <i style={{fontSize: "1.2em", color: "white"}} className={"bi bi-check"}></i> : index + 1}
                    {/*<div className={`progressing ${index + 1 < currentStep ? 'active' : ''}`} />*/}
                  </Link> :
                  <span className="step-number">
                    {index + 1 < currentStep ? <i style={{fontSize: "1.2em", color: "white"}} className={"bi bi-check"}></i> : index + 1}
                  </span>
                }
                <div >
                  <p className={`step-title ${index + 1 == currentStep ? 'current-step-title' : index + 1 < currentStep ? 'bold-step-title' : ''}`}>{step.title}</p>
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
