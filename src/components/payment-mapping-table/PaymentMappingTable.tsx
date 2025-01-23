import './PaymentMappingTable.css'
import {useState} from "react";
interface MappingTableProps {
  headers: string[]; // Table headers
  data: { id: number; name: string }[]; // Data to map (e.g., membership levels)
  mappingOptions: { id: number; name: string }[]; // Options for dropdown (e.g., products)
  onMappingChange : (itemName: string, optionId: string, optionName: string) => void; // Callback for selection,
  dropdownDefaultName: string
}

export const PaymentMappingTable = ({headers, data, mappingOptions, dropdownDefaultName, onMappingChange}: MappingTableProps) => {

  const [mappingData, setMappingData] = useState([{waName: '', qbName: '', id: ''}]);


  const handleAddMappingRow = () => {
    setMappingData((prev) => [...prev, { waName: "", qbName: "", id: "" }]);
  };

  const handleWAFieldChange = (index: number, value: string) => {
    setMappingData((prev) => {
      const updated = [...prev];
      updated[index]["waName"] = value;
      // You can add logic here if you want to update both value and name
      return updated;
    });

    console.log(mappingData)

  };

  const handleQBFieldChange = (index: number, event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const value = selectedOption.value; // option's value
    const name = selectedOption.text;  // option's name (text inside <option>)

    setMappingData((prev) => {
      const updated = [...prev];
      updated[index]["qbName"] = name;
      updated[index]["id"] = value;
      // You can add logic here if you want to update both value and name
      return updated;
    });

    console.log(mappingData)

  };

  const handleRemoveRow = (index: number) => {
    setMappingData((prev) => {
      return  [...prev].filter((data, i) => i !== index)
    })
  }

  return (
    <div>
    <div className="table">
      {/* Table Header */}
      <div className="table-header row">
        {headers.map((header, index) => (
          <p key={index} className="col-6 fw-bolder">
            {header}
          </p>
        ))}
      </div>
      {/* Table Body */}
      <div className="table-body">
        {mappingData.map((item, index) => (
          <div key={index} className="row align-items-center d-flex flex-wrap">
            <div className="col-5">
              <select
                className="form-select"
                id={`wa-select-${index}`}
                value={item.waName}
                onChange={(event) =>
                  handleWAFieldChange(index, event.target.value)
                }
              >
                <option value="" disabled>
                  {dropdownDefaultName}
                </option>
                {data.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-1 d-flex justify-content-center">
              <i className="bi bi-arrow-right" style={{ color: "#c5c5c5" }}></i>
            </div>

            <div className="col-5">
              <select
                className="form-select"
                id={`mapping-${index}`}
                value={item.id}
                onChange={(event) =>
                  handleQBFieldChange(index, event)
                }
              >
                <option value="" disabled>
                  {dropdownDefaultName}
                </option>
                {mappingOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <button
                style={{ fontSize: "0.8rem" }}
                className={'table-button'}
                onClick={() => handleRemoveRow(index)}
              >
                <i className={'bi bi-trash'}></i>
              </button>
            </div>
          </div>

        ))}
      </div>

    </div>
      <button className={'table-button'} onClick={() => handleAddMappingRow()}><i className={'bi bi-plus'} ></i>Add Mapping</button>
    </div>
  );
};
