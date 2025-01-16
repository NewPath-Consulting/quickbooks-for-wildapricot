import {getQueriedResults} from "./api/quickbooks-api/accountService.ts";

export const fetchData = async (query, setState, responseKey, setErrorMsg) => {
  try {
    const response = await getQueriedResults(query);
    console.log(response);
    const { queryResponse } = response;

    // Access the data dynamically using the responseKey
    const data = queryResponse[responseKey];

    // Map the data and update the state
    setState(data.map((item) => ({ name: item.Name, id: item.Id })));
  } catch (e) {
    console.log(e);
    setErrorMsg(e.response?.data?.error || "An error occurred");
  }
};
