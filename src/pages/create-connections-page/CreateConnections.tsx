import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {ConnectionComponent} from "../../components/connection-component/ConnectionComponent.tsx";
import {getConnections} from "../../services/api/makeApi/connectionsService.ts";

const connectionsList = [
  {
    img: "wa-logo.png",
    title: "Wild Apricot",
    description: "Necessary",
    accountName: "wild-apricot"
  },
  {
    img: "qb-logo.png",
    title: "Quickbooks",
    description: "Necessary",
    accountName: "quickbooks"
  },
  {
    img: "mg-logo.png",
    title: "Mailgun",
    description: "Necessary",
    accountName: "mailgun2"
  }
]

export const CreateConnectionsPage = () => {
  const {onBoardingData, updateData, setCurrentStep} = useOnBoarding();
  const [connections, setConnections] = useState<IConnectionResponse[]>([]);
  const [isConnectedMap, setIsConnectedMap] = useState(new Map(connectionsList.map(connection => [connection.accountName, false])));
  const [hasError, setError] = useState(false);

  useEffect(() => {
    console.log(onBoardingData)
  }, [onBoardingData])

  useEffect(() => {
    setCurrentStep(2)

    const listConnections = async () => {
      try {
        const response = await getConnections(740188);
        console.log(response.data)
        setConnections(response.data);
      }
      catch(e){
        console.error(e);
      }
    }

    listConnections();
    console.log(isConnectedMap)

    for(const connection of connections){
      if(isConnectedMap.has(connection.accountName)){
        console.log(connection.accountName, true)
        setIsConnectedMap((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.set(connection.accountName, true);
          return newMap;
        });
      }
    }
  }, []);

  return (
    <main>
      <header>
        <h2>Connect your Tools</h2>
        <p>Set up your app connections to automate your workflows.</p>
      </header>
      <div>
        {connectionsList.map((connection, index) => <ConnectionComponent key={index} isConnected={isConnectedMap.get(connection.accountName) || false} title={connection.title} img={connection.img} description={connection.description}/>)}
      </div>
      <button className={"btn-success"} disabled={false} type={"submit"} onClick={() => console.log(isConnectedMap)}>Next</button>
    </main>
  )
}