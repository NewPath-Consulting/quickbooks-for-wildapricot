import {useRef, useState} from "react";
import './ConnectionComponent.css'
import * as React from "react";
import {IConnection} from "../../pages/create-connections-page/CreateConnections.tsx";
import {useOnBoarding} from "../../hooks/useOnboarding.ts";
export interface ConnectionComponentProps {
  connection: IConnection,
  isConnected: boolean,
  createConnection: Function,
  isLoading: boolean,
}

export interface ICredentials {
  apiKeyMG: string,
  apiKeyWA: string,
  baseUrl: string,
  clientId: string,
  clientSecret: string
}

export const ConnectionComponent: React.FC<ConnectionComponentProps> = ({isLoading, connection, isConnected, createConnection}) => {
  const {onBoardingData} = useOnBoarding();
  const [credentials, setCredentials] = useState<ICredentials>({apiKeyMG: "", baseUrl: "", apiKeyWA: onBoardingData.wildApricotAPI, clientId: localStorage.getItem("qbClientId") || "", clientSecret: localStorage.getItem("qbClientSecret") || ""});

  const handleInput = (e) => {
    const {name, value} = e.target;

    setCredentials({
      ...credentials,
      [name]: value
    })
  }



    const postConnection = () => {
      createConnection(credentials, connection);
    };

  const modalBody = () => {
    if(connection.accountType == 'quickbooks'){
      return (
        <form>
          <div className="mb-3">
            <label htmlFor="client-id" className="col-form-label">Client Id:</label>
            <input type="text" name={"clientId"} value={credentials.clientId} onChange={handleInput} placeholder={""} className="form-control" id="client-id" />
          </div>
          <div className="mb-3">
            <label htmlFor="client-secret" className="col-form-label">Client Secret:</label>
            <input type="password" value={credentials.clientSecret} name={"clientSecret"} onChange={handleInput} placeholder={""} className="form-control" id="client-secret" />
          </div>
        </form>
      )
    }

    else if(connection.accountType == 'mailgun2'){
      return (
        <form>
          <div className="mb-3">
            <label htmlFor={`api-key-mg`} className="col-form-label">Api Key:</label>
            <input type="password" value={credentials.apiKeyMG} name={`apiKeyMG`} onChange={handleInput} placeholder={""} className="form-control" id='api-key-mg'/>
          </div>
          <div className="mb-3">
            <label htmlFor={`base-url`} className="col-form-label">Base Url:</label>
            <input type="text" value={credentials.baseUrl} name={`baseUrl`} onChange={handleInput} placeholder={""} className="form-control" id='base-url'/>
          </div>
        </form>
      )
    }

    else{
      return (
        <form>
          <div className="mb-3">
            <label htmlFor={`${connection.accountType == 'wild-apricot' ? "api-key-wa" : "api-key-mg"}`} className="col-form-label">Api Key:</label>
            <input type="password" value={credentials.apiKeyWA} name={`${connection.accountType == 'wild-apricot' ? "apiKeyWA" : "apiKeyMG"}`} onChange={handleInput} placeholder={""} className="form-control" id={`${connection.accountType == 'wild-apricot' ? "api-key-wa" : "api-key-mg"}`} />
          </div>
        </form>
      )
    }
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

        <div className="modal fade" id={`${connection.accountType}`} tabIndex="-1" aria-labelledby={`${connection.accountType}Label`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  <img src={connection.img} width={30} className={"rounded-1 me-2"} alt={"app logo"}/>
                  {connection.title}
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {modalBody()}
                <button onClick={postConnection} data-bs-dismiss="modal" type="button">
                  Connect App
                </button>
              </div>
              <div className="modal-footer">
                <button data-bs-dismiss="modal" type="button">
                  Need Help?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}