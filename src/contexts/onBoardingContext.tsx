import {createContext, useEffect, useRef, useState} from "react";
import {ICustomerInformation} from "../typings/ICustomerInformation.ts";
import {getUserInfo} from "../services/api/makeApi/usersService.ts";
import {getConnections} from "../services/api/makeApi/connectionsService.ts";
import {setAuth} from "../services/httpClient.ts";
import {ICustomerInfo} from "../pages/customer-info-page/CustomerInformationPage.tsx";

interface OnboardingState {
  authToken: string;
  baseUrl: string;
  connections: { name: string; apiKey: string }[];
  customerInfo: ICustomerInfo | {};
  wildApricotAPI: string
}

interface OnboardingContextType {
  onBoardingData: OnboardingState | undefined;
  updateData: (data: any) => void;
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
      customerInfo: {},
      wildApricotAPI: "va7pv0rmuop5023me31e71kujcwos3"
    };
  });

  useEffect(() => {
    if(onBoardingData.baseUrl && onBoardingData.authToken){
      setAuth(onBoardingData.authToken);
    }
  }, []);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const updateData = (data) => {
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