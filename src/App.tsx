import './App.css'
import {useEffect, useState} from "react";
import {getUserInfo} from "./services/api/makeApi/usersService.ts";
import {createScenario, getScenarioBlueprint, getScenarios} from "./services/api/makeApi/scenariosService.ts";
import {createConnection, getConnections, verifyConnection} from "./services/api/makeApi/connectionsService.ts";
import {createDataStore, createDataStructure, getDataStructures} from "./services/api/makeApi/dataStructuresService.ts";
import {setAuth} from "./services/httpClient.ts";
import {setConnectionValue, setDataStoreValue, setJSONValue} from "./utils/setParameters.ts";
import {useOnBoarding} from "./hooks/useOnboarding.ts";
import {toast} from "react-toastify";
import update = toast.update;

//26aba993-f746-44bf-9378-e71a2ffae2e6
function App() {
  const {onBoardingData, updateData} = useOnBoarding();
  const [authToken, setAuthToken] = useState("");
  const [apiKey, setApikey] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isVerified, setVerification] = useState<boolean>(false);
  const [isQBVerified, setQBVerification] = useState<boolean>(false);
  const [areStructuresCloned, setClonedStructures] = useState<boolean>(false);
  const [areScenariosCloned, setClonedScenarios] = useState<boolean>(false);
  const [isWAVerified, setWAVerification] = useState<boolean>(false);
  const [connections, setConnections] = useState<any[]>([]);
  let dataStoreId;
  const dataStructureMap: Map<number, number> = new Map<number, number>([[2816, 193656], [7152, 193657], [7153, 193658], [2818, 193659], [2814, 193660], [2817,193661], [2815, 193662], [2820, 193663], [2819, 193664]]);
  const verifyUser = async(e) => {
    e.preventDefault()
    setAuth(authToken);
    updateData({authToken});
    try{
      const response = await getUserInfo();
      setVerification(true);

      const connectionResponse: any = await getConnections(740188);
      setConnections(connectionResponse.connections);
      console.log(connections)
    }
    catch(e){
      console.error(e.response.data.error);
      setVerification(false)
    }
  }

  const handleConnection = async (connectionId: number, name: string) => {
    const URL = `https://us1.make.com/api/v2/oauth/auth/${connectionId}`;
    const authWindow = window.open(URL, "_blank", "width=500,height=600");

    if (!authWindow) {
      alert("Popup blocked! Please allow popups for this site.");
      return;
    }

    // Monitor the window state
    const interval = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(interval); // Stop monitoring the window
        verifyAppConnection(connectionId, name);
      }
    }, 500);
  }

  const verifyAppConnection = async (connectionId: number, name: string) => {
    try{
      const response = await verifyConnection(connectionId);
      console.log(response);
      name == 'wild-apricot' ? setWAVerification(true) : setQBVerification(true);
    }
    catch(e){
      console.log(e);
      name == 'wild-apricot' ? setWAVerification(false) : setQBVerification(false);
    }
  }

  const postConnection = async(e, body: IConnectionBody, teamId: number) => {
    e.preventDefault()

    try{
      const response: any = await createConnection(body, teamId);
      handleConnection(response.connection.id, response.connection.accountName);
    }
    catch(e){
      console.error(e.response.data.error);
      setVerification(false)
    }
  }

  const cloneDataStructures = async () => {
    let dataStructureId;
    try{
      const response: any = await getDataStructures(297);
      const dataStructures = response.dataStructures;

      for (let i = 0; i < 9; i++) {
        try{
          const dataStructureDetails: any = await createDataStructure({spec: dataStructures[i].spec, name: dataStructures[i].name, teamId: 740188})
          dataStructureMap.set(dataStructures[i].id, dataStructureDetails.dataStructure.id)
          if(i == 0){
            dataStructureId = dataStructureDetails.dataStructure.id;
          }
        }
        catch (e){
          console.log(e);
        }
      }

      console.log(dataStructureId);

      const dataStoreResponse: any = await createDataStore({datastructureId: dataStructureId, name: 'QBWA Test', teamId: 740188})
      dataStoreId = dataStoreResponse.dataStore.id;

      console.log(dataStoreId, dataStructureMap);
    }
    catch(e){
      console.log(e);
    }
  }

  const cloneScenarios = async () => {
    try {
      const response: any = await getScenarios(297, 188054);

      for (const scenario of response.scenarios) {
        try {
          const blueprintResponse: any = await getScenarioBlueprint(scenario.id);
          const blueprint = blueprintResponse.data;
          setConnectionValue(blueprint, "__IMTCONN__", connections);
          setDataStoreValue(blueprint, 59838);
          setJSONValue(blueprint, dataStructureMap);
          await createScenario({
            scheduling: "{ \"type\": \"indefinitely\", \"interval\": 900 }",
            teamId: 740188,
            blueprint: JSON.stringify(blueprint)
          })
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <form onSubmit={verifyUser} style={{display: "flex", flexDirection: "column", gap: "1em"}}>
        <div>
          <label htmlFor="auth-token">Auth Token: </label>
          <input
            type="password"
            required
            id="auth-token"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)} // Capture user input
          />
        </div>
        <button type="submit">Verify</button>
      </form>
      {isVerified && <p>Verification successful!</p>}
      <form
        onSubmit={(e) => postConnection(e, {apiKey: apiKey, accountType: "wild-apricot", accountName: "WA Connection", scopes: ["auto"]}, 740188)}
        style={{display: "flex", flexDirection: "column", gap: "1em"}}>
        <div>
          <label htmlFor="api-key">Wild Apricot API key: </label>
          <input
            type="password"
            required
            id="api-key"
            value={apiKey}
            onChange={(e) => setApikey(e.target.value)} // Capture user input
          />
        </div>
        <button disabled={!isVerified} type="submit">Connect</button>
      </form>
      {isWAVerified && <p>Verification successful!</p>}
      <form
            onSubmit={(e) => postConnection(e, {accountType: "quickbooks", accountName: "QB Connection", scopes: ["com.intuit.quickbooks.accounting", "com.intuit.quickbooks.payment", "openid"]}, 740188)}
            style={{display: "flex", flexDirection: "column", gap: "1em"}}>
        <div>
          <label htmlFor="client-id">Quickbooks Client ID: </label>
          <input
            type="password"
            required
            id="client-id"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)} // Capture user input
          />
        </div>
        <div>
          <label htmlFor="client-secret">Quickbooks Client Secret: </label>
          <input
            type="password"
            required
            id="client-secret"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)} // Capture user input
          />
        </div>
        <button disabled={!isVerified} type="submit">Connect</button>
      </form>
      {isQBVerified && <p>Verification successful!</p>}
      <h3>Clone Data Structures</h3>
      <button onClick={cloneDataStructures}>Clone</button>
      <h3>Clone Scenarios</h3>
      <button onClick={cloneScenarios}>Clone</button>
    </>
  )
}

export default App
