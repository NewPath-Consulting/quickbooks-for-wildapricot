import "./Sidebar.css";
import {steps} from "../../onboardingSteps.ts";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul className="steps">
        {
          steps.map((step, index) => {
            return (
              <li className={index == 0  ? "active-step" : ""} key={index}>
                <span className="step-number">{step.stepNumber}</span>
                <div>
                  <strong style={{fontSize: "0.9rem"}}>{step.title}</strong>
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
