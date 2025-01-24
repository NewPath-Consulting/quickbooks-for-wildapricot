import './MappingTable.css'
import {useState} from "react";
interface MappingTableProps {
  headers: string[]; // Table headers
  data: { id: number; name: string }[]; // Data to map (e.g., membership levels)
  mappingOptions: { id: number; name: string }[]; // Options for dropdown (e.g., products)
  onMappingChange : (itemName: string, optionId: string, optionName: string) => void; // Callback for selection,
}

export const MappingTable = ({headers, data, mappingOptions, onMappingChange}: MappingTableProps) => {

  const [mappingData, setMappingData] = useState([{waName: '', qbName: '', id: ''}]);
  const handleMapping = (event, itemName) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const value = selectedOption.value; // option's value
    const name = selectedOption.text;  // option's name (text inside <option>)

    onMappingChange(itemName, value, name)

  }

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
    <div className={'table-container table-wrapper'}>
      <table className="table ">
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "50%" }} />
        </colgroup>
        <caption><button className={'table-button d-inline'} onClick={() => handleAddMappingRow()}><i className={'bi bi-plus'} ></i>Add Mapping</button></caption>
        <thead className={'table-light'}>
        <tr>
          {
            headers.map((header, index) => {
              return <th key={index} className={'fw-medium'} scope="col">{header}</th>
            })
          }
        </tr>
        </thead>
        <tbody>
        {
          mappingData.map((item, index) => {
            return (
              <tr>
                <td className="d-flex border-bottom-0 align-items-center gap-2"> <select
                  className="form-select"
                  value={item.waName}
                  onChange={(event) => handleWAFieldChange(index, event.target.value)}
                >
                  <option value="" disabled>
                    Choose {headers[0]}
                  </option>
                  {data.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                  <i className={'bi bi-arrow-right'}></i>
                </td>
                <td> <select
                  className="form-select"
                  value={item.id}
                  onChange={(event) => handleQBFieldChange(index, event)}
                >
                  <option value="" disabled>
                    Choose {headers[1]}
                  </option>
                  {mappingOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select></td>
                {headers.length > 2 && <td>@mdo</td>}
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  );
};
