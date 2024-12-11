
const endpoints = {
  quickbooksApi: {
    getInvoice: "/quickbooks/invoice",
    createInvoice: "/quickbooks/invoice",
  },
  wildApricotApi: {
    getMembers: "/wild-apricot/members",
    updateMember: "/wild-apricot/members/:id",
  },
  makeApi: {
    listDataStructures: "makeApi/data-structures",
    createDataStructure: "makeApi/data-structures",
    createDataStore: "makeApi/data-stores",
    createDataRecord: "makeApi/data-stores/:dataStoreId/data",
    listScenarios: "makeApi/scenarios",
    createScenario: "makeApi/scenarios",
    getScenarioBlueprint: "makeApi/scenarios/:scenarioId/blueprint",
    listConnections: "makeApi/connections",
    createConnection: "makeApi/connections",
    verifyConnection: "makeApi/connections/:connectionId/test",
    updateDataRecord: "makeApi/data-stores/:dataStoreId/data/:key",
    listOrganizations: "makeApi/organizations",
    listTeams: "makeApi/teams",
    OAuth: "makeApi/oauth/auth/:connectionId",
    getUserInfo: "makeApi/users/me"
  },
};

export default endpoints;