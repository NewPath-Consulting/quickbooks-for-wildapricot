import "./Sidebar.css";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";

const Sidebar: React.FC = () => {
  const { currentStepIndex, canAccessStep, steps } = useOnBoarding();
  const navigate = useNavigate()
  const stepRefs = useRef<(HTMLLIElement | null)[]>(steps.map(step => null)); // Array of refs for steps

  useEffect(() => {
    if (stepRefs.current[currentStepIndex]) {
      stepRefs.current[currentStepIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentStepIndex]); // Run when currentStep changes

  return (
    <aside className="sidebar">
      {/*<img className={''} style={{margin: "1.2em 20px 1.9em 0.7em"}} width={100} height={22} src={"logo.png"} alt={"NewPaths logo"}/>*/}
      <div className={'d-flex gap-2 align-items-center mb-5 mt-1'}>
        <div className={'rounded-2 logo d-flex justify-content-center align-items-center'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
            <path d="M100 250 L150 50 L200 250" stroke="#fff" stroke-width="30" stroke-linejoin="miter" stroke-linecap="butt" fill="none" />

            <line x1="70" y1="170" x2="230" y2="170" stroke="#fff" stroke-width="15" stroke-linecap="butt" />
            <line x1="70" y1="210" x2="230" y2="210" stroke="#fff" stroke-width="15" stroke-linecap="butt" />
          </svg>
        </div>
        <div>
          <strong className={'fw-medium fs-5'}>AccountBridge</strong>
        </div>
      </div>

      <ul className="steps">
        {/*<div className={'progress'} style={{height: `${(100/(steps.length-1))*(currentStepIndex)}%`}}></div>*/}
        {steps.map((step, index) => {
          const isCompleted = step.isCompleted;
          const isActive = index === currentStepIndex;
          const isAccessible = canAccessStep(step.endpoint);

          return (
            <li
              ref={(el) => { stepRefs.current[index] = el; }}
              className={`
                ${isActive ? "active-step" : isCompleted ? "completed-step" : ""} 
              `}
              key={step.endpoint}
            >
              <div
                className={`step-number ${isAccessible ? "clickable" : ""}`}
                onClick={() => isAccessible && navigate(step.endpoint)}
              >
                {isActive || !isCompleted ? (
                  index + 1
                ) : (
                  <i
                    style={{ fontSize: "1.2em", color: "white" }}
                    className="bi bi-check"
                  />
                )
                }
                <div
                  className="progressing"
                  style={{
                    height: (isCompleted && currentStepIndex == index + 1 || isCompleted && steps[index+1]?.isCompleted) ? "45px" : "0px",
                  }}
                />
              </div>

              <div>
                <p className={`step-title ${isActive || isCompleted ? 'bold-step-title' : ''}`}>
                  {step.title}
                </p>
                <p className={`step-sub-title ${isActive || isCompleted ? 'bold-step-title' : ''}`}>
                  {step.subTitle}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
