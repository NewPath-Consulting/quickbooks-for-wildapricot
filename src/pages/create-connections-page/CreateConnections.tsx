import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {ConnectionComponent, ICredentials} from "../../components/connection-component/ConnectionComponent.tsx";
import {createConnection, getConnections, verifyConnection} from "../../services/api/make-api/connectionsService.ts";
import {useNavigate} from "react-router-dom";
import {teamId} from "../../FirstDraft.tsx";
import {getWildApricotAccessToken} from "../../services/api/wild-apricot-api/authService.ts";

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

  const openAuthWindow = (url: string) => {
    const authWindow = window.open(url, "_blank", "width=500,height=600");

    if (!authWindow) {
      alert("Popup blocked! Please allow popups for this site.");
      throw new Error("Popup blocked");
    }

    return authWindow;
  };

  const monitorAuthWindow = async (authWindow: Window, connectionId: number, connectionBody: IConnectionBody) => {
    return new Promise<void>((resolve, reject) => {
      const interval = setInterval(async () => {
        if (authWindow.closed) {
          clearInterval(interval); // Stop monitoring the window
          try {
            const response = await verifyConnection(connectionId);

            setIsConnectedMap((prevMap) => {
              const newMap = new Map(prevMap);
              newMap.set(connectionBody.accountType, true);
              return newMap;
            });

            if (connectionBody.accountType === "wild-apricot") {
              localStorage.setItem("waApiKey", connectionBody.apiKey as string);
              await getWildApricotAccessToken({apiKey: connectionBody.apiKey as string});
            }

            setConnectionLoading(connectionBody.accountType, false);
            resolve();
          } catch (error: any) {
            setConnectionLoading(connectionBody.accountType, false);
            setErrorMsg(error.response.data.error + connectionBody.accountName);
            reject(error);
          }
        }
      }, 500);
    });
  };

  const buildConnectionBody = (credentials: ICredentials, connection: IConnection): IConnectionBody => {
    const baseBody = {
      accountType: connection.accountType,
      accountName: `${connection.title} Connection`
    };

    const connectionConfigs = {
      'wild-apricot': {
        apiKey: credentials.apiKeyWA,
        scopes: connection.scopes
      },
      'quickbooks': {
        scopes: connection.scopes,
        // clientId: credentials.clientId,
        // clientSecret: credentials.clientSecret
      },
      'mailgun2': {
        apiKey: credentials.apiKeyMG,
        baseUrl: credentials.baseUrl
      }
    };

    return {
      ...baseBody,
      ...connectionConfigs[connection.accountType]
    };
  };

  const handleConnection = async (credentials: ICredentials, connection: IConnection) => {
    setConnectionLoading(connection.accountType, true);

    const connectionBody: IConnectionBody = buildConnectionBody(credentials, connection)

    try {
      const connectionResponse = await createConnection(connectionBody, teamId);
      const connectionId = connectionResponse.data.id;
      const URL = `https://us1.make.com/api/v2/oauth/auth/${connectionId}`;

      const authWindow = openAuthWindow(URL);
      await monitorAuthWindow(authWindow, connectionId, connectionBody);

      setErrorMsg(""); // Clear error message on success
    } catch (error: any) {
      setConnectionLoading(connectionBody.accountType, false);
      setErrorMsg(error.response?.data?.error + connectionBody.accountName || "An error occurred");
      console.error(error);
    }
  };

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

  const handleNextPage = () => {
    if(Array.from(isConnectedMap).some(val => !val[1])){
      setErrorMsg("Connect to all apps to continue")
    }
    else{
      navigate('/customer-information')
    }
  }

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
        <button className={"btn-success"} disabled={Array.from(isConnectedMap).every(val => !val[1])} type={"submit"} onClick={() => handleNextPage()}>Next</button>
      </div>

    </main>
  )
}