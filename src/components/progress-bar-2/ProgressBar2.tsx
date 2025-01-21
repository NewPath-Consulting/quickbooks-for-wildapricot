import "./ProgressBar2.css";
import {steps} from "../../onboardingSteps.ts";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";

const ProgressBar2: React.FC = () => {
  const { currentStep } = useOnBoarding();

  return (
    <div className={'progress-container-3'}>
      <p className={'mb-3 step-text'}>Steps {currentStep}/{steps.length}</p>
      <div className="progress-container-2">
        {
          steps.map((step, index )=> {
            const isClickable = index + 1 <= currentStep

            return (
              <div className={`step `} style={{width: `${100/steps.length-1}%`}} key={index}><div className={'progress'} style={{width: `${index + 1 < currentStep ? '100%' : '0%'}`}}></div></div>
            )
          })
        }
      </div>
    </div>

  );
};

export default ProgressBar2;