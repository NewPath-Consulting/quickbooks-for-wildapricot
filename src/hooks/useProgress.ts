import {useState} from "react";


export const useProgress = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return {currentStep, nextStep, prevStep}
}