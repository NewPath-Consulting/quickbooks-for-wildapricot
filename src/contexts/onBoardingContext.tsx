import {createContext, useEffect, useRef, useState} from "react";
import {ICustomerInformation} from "../typings/ICustomerInformation.ts";
import {getUserInfo} from "../services/api/make-api/usersService.ts";
import {getConnections} from "../services/api/make-api/connectionsService.ts";
import {AuthService} from "../services/httpClient.ts";
import {ICustomerInfo} from "../pages/customer-info-page/CustomerInformationPage.tsx";
import {IGeneralInformation} from "../pages/general-information-page/GeneralInformationPage.tsx";

interface OnboardingState {
  authToken: string;
  baseUrl: string;
  connections: { name: string; apiKey: string }[];
  customerInfo: ICustomerInfo | {};
  wildApricotAPI: string,
  generalInfo: IGeneralInformation | {}
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
    const savedWildApricotAPI = localStorage.getItem("waApiKey") || ""
    return {
      baseUrl: savedBaseUrl,
      authToken: savedAuthToken,
      connections: [],
      customerInfo: {},
      wildApricotAPI: savedWildApricotAPI,
      generalInfo: {}
    };
  });

  useEffect(() => {
    if(onBoardingData.baseUrl && onBoardingData.authToken){
      AuthService.setAuth(onBoardingData.authToken, onBoardingData.baseUrl);
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