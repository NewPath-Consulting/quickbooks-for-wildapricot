import {useRef, useState} from "react";
import './ConnectionComponent.css'
import * as React from "react";
import {IConnection} from "../../pages/create-connections-page/CreateConnections.tsx";
export interface ConnectionComponentProps {
  connection: IConnection,
  isConnected: boolean,
  createConnection: Function,
  isLoading: boolean
}

export const ConnectionComponent: React.FC<ConnectionComponentProps> = ({isLoading, connection, isConnected, createConnection}) => {
  const [credentials, setCredentials] = useState<any>({});

  const handleInput = (e) => {
    const {name, value} = e.target;

    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const postConnection = () => {
    const body: IConnectionBody = {
      accountType: connection.accountType,
      accountName: connection.title + " Connection"
    }

    if(connection.accountType == 'wild-apricot'){
      body.apiKey = credentials.apiKeyWA
      body.scopes = connection.scopes;
    }
    else if(connection.accountType == 'quickbooks'){
      body.scopes = connection.scopes
    }
    else{
      body.apiKey = credentials.apiKeyMG;
      body.baseUrl = credentials.baseUrl;
    }

    createConnection(body);
  }

  const modalBody = () => {
    if(connection.accountType == 'quickbooks'){
      return (
        <form>
          <div className="mb-3">
            <label htmlFor="client-id" className="col-form-label">Client Id:</label>
            <input type="text" name={"clientId"} onChange={handleInput} placeholder={""} className="form-control" id="client-id" />
          </div>
          <div className="mb-3">
            <label htmlFor="client-secret" className="col-form-label">Client Secret:</label>
            <input type="password" name={"clientSecret"} onChange={handleInput} placeholder={""} className="form-control" id="client-secret" />
          </div>
        </form>
      )
    }

    else if(connection.accountType == 'mailgun2'){
      return (
        <form>
          <div className="mb-3">
            <label htmlFor={`api-key-mg`} className="col-form-label">Api Key:</label>
            <input type="password" name={`apiKeyMG`} onChange={handleInput} placeholder={""} className="form-control" id='api-key-mg'/>
          </div>
          <div className="mb-3">
            <label htmlFor={`base-url`} className="col-form-label">Base Url:</label>
            <input type="text" name={`baseUrl`} onChange={handleInput} placeholder={""} className="form-control" id='base-url'/>
          </div>
        </form>
      )
    }

    else{
      return (
        <form>
          <div className="mb-3">
            <label htmlFor={`${connection.accountType == 'wild-apricot' ? "api-key-wa" : "api-key-mg"}`} className="col-form-label">Api Key:</label>
            <input type="password" name={`${connection.accountType == 'wild-apricot' ? "apiKeyWA" : "apiKeyMG"}`} onChange={handleInput} placeholder={""} className="form-control" id={`${connection.accountType == 'wild-apricot' ? "api-key-wa" : "api-key-mg"}`} />
          </div>
        </form>
      )
    }
  }
  return (
    <div className={`instruction-container mb-3 col-md me-3`}>

      <img src={connection.img} className={"rounded-1"} width={40} alt={"predefined images for each step"}/>
      <strong>{connection.title}</strong>
      <p style={{color: "gray", }}>{connection.description}</p>
      <div className={'button-container'}>
        <button data-bs-toggle="modal" className={"align-self-baseline"} data-bs-target={`#${connection.accountType}`}>
          <i className={'bi bi-plus me-1'} style={{color: '#747bff'}}></i>Connect
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
            </div>
            <div className="modal-footer">
              <button onClick={postConnection} data-bs-dismiss="modal" type="button" className="not-completed fw-bold d-flex align-items-center" style={{color: "white"}}>
                Connect App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}