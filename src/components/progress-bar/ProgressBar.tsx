import "./ProgressBar.css";
import {steps} from "../../onboardingSteps.ts";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";

const ProgressBar: React.FC = () => {
  const { currentStep } = useOnBoarding();

  return (
    <aside className="progress-container">
      <div className={`progress`} style={{width: `${(100/(steps.length-1))*(currentStep-1)}%`}}></div>
      {
        steps.map((step, index )=> {
          const isClickable = index + 1 <= currentStep

          return (
            <div className={`step ${index + 1 < currentStep ? "completed" : index + 1 == currentStep  ? "active" : ""} `}  key={index}>{index+1}</div>
          )
        })
      }
    </aside>
  );
};

export default ProgressBar;