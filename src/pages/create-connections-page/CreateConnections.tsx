import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";


export const CreateConnectionsPage = () => {
  const {onBoardingData, updateData, setCurrentStep} = useOnBoarding();
  const [hasError, setError] = useState(false);

  useEffect(() => {
    console.log(onBoardingData)
  }, [onBoardingData])

  useEffect(() => {
    setCurrentStep(2)
  }, []);

  return (
    <main>
      <header>
        <h2>Connect your Tools</h2>
        <p>Set up your app connections to automate your workflows.</p>
      </header>


    </main>
  )
}