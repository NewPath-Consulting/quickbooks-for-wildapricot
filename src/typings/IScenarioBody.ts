export interface IScenarioBody{
  blueprint: string,
  teamId: number,
  folderId?: number,
  scheduling: string
}

export interface IScenarioResponse{
  id: number,
  teamId: number,
  folderId: number,
  name: string
}