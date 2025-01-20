import "./ProgressBar2.css";
import {steps} from "../../onboardingSteps.ts";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";

const ProgressBar2: React.FC = () => {
  const { currentStep } = useOnBoarding();

  return (
    <aside className="progress-container-2">
      {
        steps.map((step, index )=> {
          const isClickable = index + 1 <= currentStep

          return (
            <div className={`step `} style={{width: `${100/steps.length-1}%`}} key={index}><div className={'progress'} style={{width: `${index + 1 < currentStep ? '100%' : '0%'}`}}></div></div>
          )
        })
      }



    </aside>
  );
};

export default ProgressBar2;