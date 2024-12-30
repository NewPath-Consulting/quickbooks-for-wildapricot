import {useRef, useState} from "react";
import './ConnectionComponent.css'
import * as React from "react";
import {IConnection} from "../../pages/create-connections-page/CreateConnections.tsx";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {ConnectionModal} from "../modal/ConnectionModal.tsx";
export interface ConnectionComponentProps {
  connection: IConnection,
  isConnected: boolean,
  createConnection: Function,
  isLoading: boolean,
  createConnectionToNewPath: Function
}

export const ConnectionComponent: React.FC<ConnectionComponentProps> = ({isLoading, connection, isConnected, createConnection, createConnectionToNewPath}) => {
  const {onBoardingData} = useOnBoarding();

  const postConnection = (connectionFields: {}) => {
    createConnection(connectionFields, connection);
  };

  const postAppConnection = (secondaryConnectionFields: {}) => {
    createConnectionToNewPath(secondaryConnectionFields, connection)
  }


  return (
    <div className={'mb-3 col-md-4 col-sm-12'}>
      <div className={`instruction-container h-100 ${isConnected ? "completed" : ""}`}>
        <div className={'header'}>
          <div>
            <img src={connection.img} className={"rounded-1"} width={40} alt={"predefined images for each step"}/>
            {isConnected && <i className={'bi bi-check2-circle float-end fw-bold'} style={{color: 'rgb(141,231,165)'}}></i>}
          </div>
          <strong className={'fw-normal'}>{connection.title}</strong>
          <p style={{color: "gray", }}>{connection.description}</p>
          {/*<div>*/}
          {/*  <button className={'me-2 mb-2'}>Connect</button>*/}
          {/*  <button>Connect to Make</button>*/}
          {/*</div>*/}
        </div>
        <div className={`button-container` }>
          <button data-bs-toggle="modal" className={"align-self-baseline float-end"} data-bs-target={`#${connection.accountType}`}>
            {isConnected ? "View Connection" : "Connect"}
          </button>
        </div>
        <ConnectionModal postConnection={postConnection} postAppConnection={postAppConnection} connection={connection}/>
      </div>
    </div>
  )
}