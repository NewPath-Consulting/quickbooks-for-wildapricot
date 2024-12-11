import {useContext} from "react";
import {OnboardingContext} from "../contexts/onBoardingContext.tsx";

export const useOnBoarding = () => {
  return useContext(OnboardingContext);
}