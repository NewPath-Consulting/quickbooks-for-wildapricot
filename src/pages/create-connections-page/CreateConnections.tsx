import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {ConnectionComponent} from "../../components/connection-component/ConnectionComponent.tsx";
import {createConnection, getConnections, verifyConnection} from "../../services/api/makeApi/connectionsService.ts";
import {toast} from "react-toastify";

export interface IConnection {
  img: string,
  title: string,
  description: string,
  accountType: string,
  scopes ?: string[]
}
const connectionsList: IConnection[] = [
  {
    img: "wa-logo.png",
    title: "Wild Apricot",
    description: "Necessary",
    accountType: "wild-apricot",
    scopes: ["auto"]
  },
  {
    img: "qb-logo.png",
    title: "Quickbooks",
    description: "Necessary",
    accountType: "quickbooks",
    scopes: [
      "com.intuit.quickbooks.accounting",
    "com.intuit.quickbooks.payment",
    "openid"
    ]
  },
  {
    img: "mg-logo.png",
    title: "Mailgun",
    description: "Necessary",
    accountType: "mailgun2"
  }
]

export const CreateConnectionsPage = () => {
  const {onBoardingData, updateData, setCurrentStep} = useOnBoarding();
  const [errorMsg, setErrorMsg] = useState("");
  const [isConnectedMap, setIsConnectedMap] = useState(() => {
    const initialMap = new Map(
      connectionsList.map((connection) => [connection.accountType, false])
    );

    if (onBoardingData.connections) {
      for (const connection of onBoardingData.connections) {
        if (initialMap.has(connection.accountName)) {
          initialMap.set(connection.accountName, true);
        }
      }
    }

    return initialMap;
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleConnection = async (connectionBody: IConnectionBody) => {
    setIsLoading(true)
    try{
      const connectionResponse = await createConnection(connectionBody, 740188);
      const connectionId = connectionResponse.data.id;
      const URL = `https://us1.make.com/api/v2/oauth/auth/${connectionId}`;
      const authWindow = window.open(URL, "_blank", "width=500,height=600");

      if (!authWindow) {
        alert("Popup blocked! Please allow popups for this site.");
        return;
      }

      // Monitor the window state
      const interval = setInterval(async () => {
        if (authWindow.closed) {
          clearInterval(interval); // Stop monitoring the window
          try{
            const response = await verifyConnection(connectionId);

              setIsConnectedMap(prevMap => {
                const newMap = new Map(prevMap);
                newMap.set(connectionBody.accountType, true);
                return newMap;
              })
            console.log(response);
            setIsLoading(false)
          }
          catch(e){
            setIsLoading(false)
            setErrorMsg(e.response.data.error + connectionBody.accountName);
            console.log(e);
          }
        }
      }, 500);
    }
    catch(e){
      setIsLoading(false)
      setErrorMsg(e.response.data.error);
      console.error(e.response.data.error);
    }
  }

  useEffect(() => {
    console.log(onBoardingData)
  }, [onBoardingData])

  useEffect(() => {
    setCurrentStep(2)
    console.log(isConnectedMap)
  }, []);

  return (
    <main>
      <header>
        <h2>Connect your Tools</h2>
        <p>Set up your app connections to automate your workflows.</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
          <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
      <div>
        {connectionsList.map((connection, index) => <ConnectionComponent key={index} isLoading={isLoading} createConnection={handleConnection} isConnected={isConnectedMap.get(connection.accountType) || false} connection={connection}/>)}
      </div>
      <button className={"btn-success"} disabled={false} type={"submit"} onClick={() => console.log(isConnectedMap)}>Next</button>
    </main>
  )
}