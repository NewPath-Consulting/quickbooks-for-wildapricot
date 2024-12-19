import {createContext, useState} from "react";
import {ICustomerInformation} from "../typings/ICustomerInformation.ts";

interface OnboardingState {
  authToken: string;
  baseUrl: string;
  connections: { name: string; apiKey: string }[];
  customerInfo?: ICustomerInformation;
}

interface OnboardingContextType {
  onBoardingData: OnboardingState | undefined;
  updateData: (data: Partial<OnboardingState>) => void;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnBoardingProvider = ({children}) => {
  const [onBoardingData, setOnBoardingData] = useState<OnboardingState>(() => {
    const savedBaseUrl = localStorage.getItem("baseUrl") || "";
    const savedAuthToken = localStorage.getItem("authToken") || "";
    return {
      baseUrl: savedBaseUrl,
      authToken: savedAuthToken,
      connections: [],
    };
  });

  const [currentStep, setCurrentStep] = useState<number>(1);

  const updateData = (data: Partial<OnboardingState>) => {
    // Update context state
    setOnBoardingData((prev) => {
      const updatedData = { ...prev, ...data };

      // Persist only baseUrl and authToken in localStorage
      if (data.baseUrl) {
        localStorage.setItem("baseUrl", data.baseUrl);
      }
      if (data.authToken) {
        localStorage.setItem("authToken", data.authToken);
      }

      return updatedData;
    });
  };

  return (
    <OnboardingContext.Provider value={{onBoardingData, updateData, currentStep, setCurrentStep}}>
      {children}
    </OnboardingContext.Provider>
  )
}