import "./Sidebar.css";
import {steps} from "../../onboardingSteps.ts";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";

const Sidebar: React.FC = () => {
  const { currentStep } = useOnBoarding();

  return (
    <aside className="sidebar">
      <ul className="steps">
        {
          steps.map((step, index) => {
            const isClickable = index + 1 <= currentStep
            return (
              <li className={index + 1 < currentStep ? "completed-step" : index + 1 == currentStep  ? "active-step" : ""} key={index}>
                {isClickable ?
                  <a className="step-number" href={step.endpoint}>
                    {index + 1 < currentStep ? <i style={{fontSize: "1.2em", color: "white"}} className={"bi bi-check"}></i> : index + 1}
                  </a> :
                  <span className="step-number">
                    {index + 1 < currentStep ? <i style={{fontSize: "1.2em", color: "white"}} className={"bi bi-check"}></i> : index + 1}
                  </span>
                }
                <div >
                  <p style={{fontSize: "0.9rem", fontWeight: "500", color: `${index + 1 <= currentStep ? "black" : "rgba(0, 0, 0, 0.2)"}`}}>{step.title}</p>
                  <p style={{fontSize: "0.8rem", color: `${index + 1 <= currentStep ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.2)"}`}}>{step.subTitle}</p>
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
