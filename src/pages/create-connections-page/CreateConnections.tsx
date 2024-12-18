import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {ConnectionComponent} from "../../components/connection-component/ConnectionComponent.tsx";

const connections = [
  {
    img: "wa-logo.png",
    title: "Wild Apricot",
    description: "Necessary",
  },
  {
    img: "qb-logo.png",
    title: "Quickbooks",
    description: "Necessary",
  },
  {
    img: "mg-logo.png",
    title: "Mailgun",
    description: "Necessary",
  }
]

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

      <div>
        {
          connections.map((connection, index) => {
            return (
              <ConnectionComponent title={connection.title} img={connection.img} description={connection.description}/>
            )
          })
        }
      </div>

      <button className={"btn-success"} disabled={true} type={"submit"}>Next</button>

    </main>
  )
}