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
            return (
              <li className={index + 1 < currentStep ? "completed-step" : index + 1 == currentStep  ? "active-step" : ""} key={index}>
                <span className="step-number">{step.stepNumber}</span>
                <div>
                  <p style={{fontSize: "0.9rem", fontWeight: "500"}}>{step.title}</p>
                  <p style={{fontSize: "0.8rem", color: "grey"}}>{step.subTitle}</p>
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
