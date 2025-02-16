import "./Sidebar.css";
import {steps} from "../../onboardingSteps.ts";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";

const Sidebar: React.FC = () => {
  const { currentStep } = useOnBoarding();
  const navigate = useNavigate()
  const stepRefs = useRef<(HTMLLIElement | null)[]>(steps.map(step => null)); // Array of refs for steps

  useEffect(() => {
    if ("scrollIntoView" in stepRefs.current[currentStep - 1]) {
      stepRefs.current[currentStep - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentStep]); // Run when currentStep changes

  return (
    <aside className="sidebar">
      <img className={''} style={{margin: "1.2em 20px 1.9em 0.7em"}} width={100} height={22} src={"logo.png"} alt={"NewPaths logo"}/>
      <ul className="steps">
        <div className={'progress'} style={{height: `${(100/(steps.length-1))*(currentStep-1)}%`}}></div>
        {
          steps.map((step, index) => {
            const isClickable = index + 1 < currentStep
            return (
              <li ref={(el) => { stepRefs.current[index] = el; }} className={isClickable ? "completed-step" : index + 1 == currentStep  ? "active-step" : ""} key={index}>
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
