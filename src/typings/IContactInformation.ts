export interface IContactInformation {
  Id: number,
  FirstName: string,
  LastName: string,
  DisplayName: string,
  Url: string,
  Email: string,
  Organization: string,
  Status: string,
  MembershipLevel: IMembershipLevel,
  IsAccountAdministrator: boolean,
  TermsOfUseAccepted: boolean
}

export interface IMembershipLevel{
  Id: number,
  Url: string,
  Name: string
}