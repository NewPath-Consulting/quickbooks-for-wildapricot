import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {Navigate, useLocation} from "react-router-dom";

export const ProtectedOnboardingRoute = ({ children }) => {
  const { canAccessStep, steps, onBoardingData } = useOnBoarding();
  const location = useLocation();

  // Find the first incomplete step
  const firstIncompleteStep = steps.find(step =>
    !onBoardingData.completedSteps.includes(step.endpoint)
  );

  // If user can't access current step, redirect to first incomplete step
  if (!canAccessStep(location.pathname) && firstIncompleteStep) {
    return <Navigate to={firstIncompleteStep.endpoint} replace />;
  }

  return <>{children}</>;
};