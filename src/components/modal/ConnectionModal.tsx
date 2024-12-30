import * as React from "react";
import {IConnection} from "../../pages/create-connections-page/CreateConnections.tsx";
import {useEffect, useState} from "react";

interface IConnectionModal {
  connection: IConnection,
  postConnection: Function,
  postAppConnection: Function
}

export const ConnectionModal = (props: IConnectionModal) => {

  const { connection, postConnection, postAppConnection } = props;
  const [connectionFields, setConnectionFields] = useState(
    Object.keys(connection.fields).reduce((acc, key) => {
      acc[connection.fields[key]] = "";
      return acc;
    }, {})
  );

  const [secondaryConnectionFields, setSecondaryConnectionFields] = useState(() => {
    if (connection?.secondaryFields) {
      return Object.keys(connection.secondaryFields).reduce((acc, key) => {
        acc[connection.secondaryFields[key]] = "";
        return acc;
      }, {});
    }
    return {}; // Default to an empty object if secondaryFields is null or undefined
  });

  useEffect(() => {
    console.log(connectionFields)
  }, []);

  const handleInput = (e) => {
    const {name, value} = e.target;

    setConnectionFields({
      ...connectionFields,
      [name]: value
    })
  }

  const handleSecondaryFieldsInput = (e) => {
    const {name, value} = e.target;

    setSecondaryConnectionFields({
      ...secondaryConnectionFields,
      [name]: value
    })

    console.log(secondaryConnectionFields)
  }

  const callPostConnection = (e) => {
    e.preventDefault()
    postConnection(connectionFields)
  }

  const callPostAppConnection = (e) => {
    e.preventDefault()
    postAppConnection(secondaryConnectionFields);
  }

  return (
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
            <form onSubmit={(e) => callPostConnection(e)}>
              {
                Object.keys(connection.fields).map((field, index) => {
                  return (
                    <div className="mb-3" key={index}>
                    <label htmlFor={connection.accountType+'-'+connection.fields[field]} className="col-form-label">{field}:</label>
                    <input type={connection.fields[field] == 'clientSecret' || connection.fields[field] == 'apiKey' ? "password" : "text"} name={connection.fields[field]} value={connectionFields[field]} placeholder={""} onChange={handleInput} className="form-control" id={connection.accountType+'-'+connection.fields[field]}  />
                  </div>
                  )
                })
              }
              <button data-bs-dismiss="modal" type="submit">
                Connect app to Make
              </button>
            </form>
            {
              connection.secondaryFields &&
              <div>
                <hr/>
              <form onSubmit={callPostAppConnection}>
                {
                  Object.keys(connection.secondaryFields).map((field, index) => {
                    return (
                      <div className="mb-3" key={index}>
                        <label htmlFor={connection.accountType+'-'+connection.secondaryFields[field]} className="col-form-label">{field}:</label>
                        <input type={connection.secondaryFields[field] == 'clientSecret' || connection.secondaryFields[field] == 'apiKey' ? "password" : "text"} name={connection.secondaryFields[field]} value={secondaryConnectionFields[field]} placeholder={""} onChange={handleSecondaryFieldsInput} className="form-control" id={connection.accountType+'-'+connection.secondaryFields[field]}  />
                      </div>
                    )
                  })
                }
                    <button data-bs-dismiss="modal" type="submit">
                        Connect app to NewPath
                    </button>
                </form>
              </div>
            }
          </div>
          <div className="modal-footer">
            <button data-bs-dismiss="modal" type="button">
              Need Help?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}