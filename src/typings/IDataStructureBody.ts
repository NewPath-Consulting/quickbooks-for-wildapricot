
export interface IDataStructureBody {
  teamId: number,
  name: string,
  id?: number,
  spec: Object
}

export interface IDataStoreBody {
  teamId: number,
  name: string,
  datastructureId: number
}

export interface IDataRecordBody {
  key?: string,
  id: number,
  data: Object
}