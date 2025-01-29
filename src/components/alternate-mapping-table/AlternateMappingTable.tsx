import './AlternateMappingTable.css'
import {useState} from "react";
interface MappingTableProps {
  headers: string[]; // Table headers
  data: any[]; // Data to map (e.g., membership levels)
  mappingOptions: any[]; // Options for dropdown (e.g., products)
  onMappingChange : (actionType: string, actionPayload: {}) => void; // Callback for selection,
  classesList ?: any[];
  mappingData : any[]
}

export const AlternateMappingTable = ({headers, data, mappingOptions, onMappingChange, classesList, mappingData}: MappingTableProps) => {

  const handleAddMappingRow = () => {
    onMappingChange("ADD_ROW", {})
  };

  const handleWAFieldChange = (index: number, value: string) => {

    onMappingChange("CHANGE_WA_FIELD", {index, value})
  };

  const handleQBFieldChange = (index: number, event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const value = selectedOption.value; // option's value
    const name = selectedOption.text;  // option's name (text inside <option>)

    onMappingChange("CHANGE_QB_FIELD", {index, value, name})

  };

  const handleRemoveRow = (index: number) => {
    onMappingChange("DELETE_ROW", {index})
  }

  return (
    <div className={'table-container table-wrapper'}>
      <table className="table ">
        <colgroup>
          {headers.map((header, index) => (
            <col key={index} style={{ width: `${100 / (headers.length)}%` }} />
          ))}
        </colgroup>
        <caption><button className={'table-button d-inline'} onClick={() => handleAddMappingRow()}><i className={'bi bi-plus'} ></i>Add Mapping</button></caption>
        <thead className={'table-light'}>
        <tr>
          {
            headers.map((header, index) => {
              return <th key={index} className={'fw-medium'} scope="col">{header}</th>
            })
          }
          <th></th>
        </tr>
        </thead>
        <tbody>
        {
          mappingData.map((item, index) => {
            return (
              <tr key={index}>
                <td className="">
                  <div className="select-container">
                    <select
                      className="form-select"
                      value={item[Object.keys(mappingData[index])[0]]}
                      onChange={(event) => handleWAFieldChange(index, event.target.value)}
                    >
                      <option value="">
                        Choose {headers[0]}
                      </option>
                      {data.map((option, i) => (
                        <option disabled={mappingData.some(data => data[Object.keys(mappingData[index])[0]] === option)} key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                </td>
                <td> <select
                  className="form-select"
                  value={item[Object.keys(mappingData[index])[2]]}
                  onChange={(event) => handleQBFieldChange(index, event)}
                >
                  <option value="" disabled>
                    Choose {headers[1]}
                  </option>
                  {mappingOptions.map((option) => (
                    <option key={option.Id} value={option.Id}>
                      {option.Name}
                    </option>
                  ))}
                </select></td>

                {/* Only show this field in Payment Configuration */}
                {headers.length > 2 && <td><input disabled value={mappingOptions.find(option => option.Id == item[Object.keys(mappingData[index])[2]])?.IncomeAccountRef.name || ""} className={'form-control'}/></td>}

                {classesList &&
                  <td>
                      <select
                          className="form-select"
                          defaultValue={"choose"}
                      >
                          <option value="choose" disabled>
                              Choose {headers[3]}
                          </option>
                        {classesList.map((option) => (
                          <option key={option.Id} value={option.Id}>
                            {option.Name}
                          </option>
                        ))}
                      </select>
                  </td>
                }

                <td>
                  <button className={'table-button'} onClick={() => handleRemoveRow(index)}><i className={'bi bi-trash'}></i></button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  );
};
