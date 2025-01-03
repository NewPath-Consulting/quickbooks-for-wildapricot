import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {ConnectionComponent} from "../../components/connection-component/ConnectionComponent.tsx";
import {createConnection, getConnections, verifyConnection} from "../../services/api/make-api/connectionsService.ts";
import {useNavigate} from "react-router-dom";
import {teamId} from "../../FirstDraft.tsx";
import {getAccessToken} from "../../services/authClient.ts";

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
    title: "WildApricot",
    description: "Necessary",
    accountType: "wild-apricot",
    scopes: ["auto"]
  },
  {
    img: "qb-logo.png",
    title: "QuickBooks",
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
    return new Map(
      connectionsList.map((connection) => [connection.accountType, false])
    );
  });
  const [isLoadingMap, setIsLoadingMap] = useState(() => {
    return new Map(
      connectionsList.map((connection) => [connection.accountType, false])
    );
  });
  const [isContentLoading, setIsContentLoading] = useState(true);
  const navigate = useNavigate();

  const setConnectionLoading = (accountName: string, isLoading: boolean) => {
    setIsLoadingMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(accountName, isLoading)
      return newMap; // Return the updated map
    });
  }

  const handleConnection = async (connectionBody: IConnectionBody) => {
    setConnectionLoading(connectionBody.accountType, true)
    try{
      const connectionResponse = await createConnection(connectionBody, teamId);
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
            setErrorMsg("");
            setConnectionLoading(connectionBody.accountType, false)

            if(connectionBody.accountType == 'wild-apricot'){
              localStorage.setItem('wildApricotAPI', connectionBody.apiKey as string)
              const response = await getAccessToken(connectionBody.apiKey as string);
              const { access_token } = response
              console.log(access_token);
              localStorage.setItem('wa-access-token', access_token)
            }
          }
          catch(e){
            setConnectionLoading(connectionBody.accountType, false)
            setErrorMsg(e.response.data.error + connectionBody.accountName);
            console.log(e);
          }
        }
      }, 500);
    }
    catch(e){
      setConnectionLoading(connectionBody.accountType, false)
      setErrorMsg(e.response.data.error);
      console.error(e.response.data.error);
    }
  }

  useEffect(() => {
    const listConnections = async () => {
      try {
        const response = await getConnections(teamId);

        // Update the context state with fetched connections
        updateData({ connections: response.data });

        // Update `isConnectedMap` directly using `response.data`
        setIsConnectedMap((prevMap) => {
          const newMap = new Map(prevMap);

          for (const connection of response.data) {
            if (newMap.has(connection.accountName)) {
              newMap.set(connection.accountName, true);
            }
          }

          return newMap; // Return the updated map
        });
      } catch (error) {
        console.error("Failed to fetch connections:", error.response?.data?.error || error.message);
      }
      finally {
        setTimeout(() => {
          setIsContentLoading(false);
        }, 500)
      }
    };

    listConnections();
  }, []); // Empty dependency array ensures this runs once

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
      <div>
        {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
            <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
        </div>}
        <div>
          {connectionsList.map((connection, index) => <ConnectionComponent key={index} isContentLoading={isContentLoading} isLoading={isLoadingMap.get(connection.accountType) || false} createConnection={handleConnection} isConnected={isConnectedMap.get(connection.accountType) || false} connection={connection}/>)}
        </div>
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate('/')}>Back</button>
        <button className={"btn-success"} disabled={Array.from(isConnectedMap).every(val => !val[1])} type={"submit"} onClick={() => navigate('/customer-information')}>Next</button>
      </div>

    </main>
  )
}