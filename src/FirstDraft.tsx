import {useOnBoarding} from "./hooks/useOnboarding.ts";
import {useState} from "react";
import {getUserInfo} from "./services/api/make-api/usersService.ts";
import {createConnection, getConnections, verifyConnection} from "./services/api/make-api/connectionsService.ts";
import {
  createDataRecord,
  createDataStore,
  createDataStructure,
  getDataStructures
} from "./services/api/make-api/dataStructuresService.ts";
import {createScenario, getScenarioBlueprint, getScenarios} from "./services/api/make-api/scenariosService.ts";
import {IScenarioResponse} from "./typings/IScenarioBody.ts";
import {setConnectionValue, setDataStoreValue, setJSONValue} from "./utils/setParameters.ts";
import { configurations } from './configurations.ts'
import {formatCustomerInfo, formatDonationConfig, formatInvoiceConfig, formatPaymentConfig} from "./utils/formatter.ts";
import {InvoiceConfiguration} from "./typings/InvoiceConfiguration.ts";

export const teamId = 740188;
export const FirstDraft = () => {
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
  const [connections, setConnections] = useState<IConnectionResponse[]>([]);
  let dataStoreId;
  const dataStructureMap: Map<number, number> = new Map<number, number>([[2816, 204871], [7152, 204872], [7153, 204873], [2818, 204874], [2814, 204875], [2817,204876], [2815, 204877], [2820, 204878], [2819, 204879]]);

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
      const dataStructures = await getDataStructures(297);
      console.log(dataStructures)
      for (let i = 0; i < 9; i++) {
        try{
          const dataStructureDetails: any = await createDataStructure({spec: dataStructures[i].spec, name: dataStructures[i].name, teamId: teamId})
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

      const dataStoreResponse: any = await createDataStore({datastructureId: dataStructureId, name: 'QBWA Test', teamId: teamId})
      dataStoreId = dataStoreResponse.dataStore.id;

      console.log(dataStoreId, dataStructureMap);
    }
    catch(e){
      console.log(e);
    }
  }

  const cloneScenarios = async () => {
    try {
      const response = await getScenarios(297, 188054);
      console.log(response)
      for (const scenario: IScenarioResponse of response) {
        if(scenario.id === 3004248)
          try {
            const blueprintResponse: any = await getScenarioBlueprint(scenario.id);
            const blueprint = blueprintResponse.data;
            setConnectionValue(blueprint, "__IMTCONN__", onBoardingData.connections);
            setDataStoreValue(blueprint, 63007);
            setJSONValue(blueprint, dataStructureMap);
            await createScenario({
              scheduling: "{ \"type\": \"indefinitely\", \"interval\": 900 }",
              teamId: teamId,
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

  const postDataRecord = async () => {
    try {

      const invoiceConfigurations: InvoiceConfiguration[] = [
        {
          invoiceOrderType: "MembershipApplication",
          defaultInvoiceMapping: onBoardingData.defaultMembershipProduct,
          alternateInvoiceMapping: onBoardingData.membershipLevelMappingList,
          accountReceivable: onBoardingData.accountReceivable
        },
        {
          invoiceOrderType: "MembershipRenewal",
          defaultInvoiceMapping: onBoardingData.defaultMembershipProduct,
          alternateInvoiceMapping: onBoardingData.membershipLevelMappingList,
          accountReceivable: onBoardingData.accountReceivable
        },
        {
          invoiceOrderType: "MembershipLevelChange",
          defaultInvoiceMapping: onBoardingData.defaultMembershipProduct,
          alternateInvoiceMapping: onBoardingData.membershipLevelMappingList,
          accountReceivable: onBoardingData.accountReceivable
        },
        {
          invoiceOrderType: "EventRegistration",
          defaultInvoiceMapping: onBoardingData.defaultEventProduct,
          alternateInvoiceMapping: onBoardingData.eventMappingList,
          accountReceivable: onBoardingData.accountReceivable
        },
        {
          invoiceOrderType: "OnlineStore",
          defaultInvoiceMapping: onBoardingData.defaultStoreProduct,
          alternateInvoiceMapping: onBoardingData.onlineStoreMappingList,
          accountReceivable: onBoardingData.accountReceivable
        },
        {
          invoiceOrderType: "Undefined",
          defaultInvoiceMapping: onBoardingData.manualInvoiceMapping,
          alternateInvoiceMapping: [],
          accountReceivable: onBoardingData.accountReceivable
        }
      ]
      const response = await createDataRecord({
        id: 63007, data: {
          ...configurations,
          "Config Last Updated": new Date(),
          ...formatCustomerInfo(onBoardingData.customerInfo),
          ...formatPaymentConfig(onBoardingData.paymentMappingList, onBoardingData.accountReceivable, onBoardingData.qbDepositAccount),
          ...formatDonationConfig({
            defaultDonationConfig: onBoardingData.defaultDonationMapping,
            alternateDonationConfig: onBoardingData.donationMappingList,
            commentName: onBoardingData.donationCommentName,
            campaignName: onBoardingData.donationCampaignName
          }),
          ...formatInvoiceConfig(invoiceConfigurations)
        }
      });

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <h3>Add Data Record</h3>
      <button onClick={postDataRecord}>create</button>
    </>
  )
}

