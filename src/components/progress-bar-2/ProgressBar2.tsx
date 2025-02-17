import "./ProgressBar2.css";
import {ONBOARDING_STEPS} from "../../onboardingSteps.tsx";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";

const ProgressBar2: React.FC = () => {
  const { currentStepIndex, steps } = useOnBoarding();

  return (
    <div className={'progress-container-3'}>
      <p className={'mb-3 step-text'}>Steps {currentStepIndex+1}/{steps.length}</p>
      <div className="progress-container-2">
        {
          ONBOARDING_STEPS.map((step, index )=> {
            const isClickable = index + 1 <= currentStepIndex+1

            return (
              <div className={`step `} style={{width: `${100/steps.length-1}%`}} key={index}><div className={'progress'} style={{width: `${index < currentStepIndex ? '100%' : '0%'}`}}></div></div>
            )
          })
        }
      </div>
    </div>

  );
};

export default ProgressBar2;