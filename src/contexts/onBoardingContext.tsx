import {createContext, useContext, useState} from "react";
import {ICustomerInformation} from "../typings/ICustomerInformation.ts";

interface OnboardingState {
  authToken: string;
  baseUrl: string;
  connections: { name: string; apiKey: string }[];
  customerInfo?: ICustomerInformation;
}

interface OnboardingContextType {
  onBoardingData: OnboardingState | undefined;
  updateData: Function;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnBoardingProvider = ({children}) => {
  const [onBoardingData, setOnBoardingData] = useState<OnboardingState>({
    baseUrl: "",
    authToken: "",
    connections: []
  });

  const updateData = (data) => {
    setOnBoardingData(prev => {
      return {...prev, ...data}
    })
  }

  return (
    <OnboardingContext.Provider value={{onBoardingData, updateData}}>
      {children}
    </OnboardingContext.Provider>
  )
}