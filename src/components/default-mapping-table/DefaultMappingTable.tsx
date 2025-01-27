import {useState} from "react";
interface MappingTableProps {
  headers: string[]; // Table headers
  data: any[]; // Data to map (e.g., membership levels)
  mappingOptions: any[]; // Options for dropdown (e.g., products)
  onMappingChange ?: (itemName: string, optionId: string, optionName: string) => void; // Callback for selection,
}

export const DefaultMappingTable = ({headers, data, mappingOptions}: MappingTableProps) => {

  const [defaultField, setDefaultField] = useState({name: '', id: ''});

  const handleSelection = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const id = selectedOption.value; // option's value
    const name = selectedOption.text;  // option's name (text inside <option>)

    setDefaultField({name, id})

    console.log(defaultField)
  }

  return (
    <div className={'table-container table-wrapper'}>
      <table className="table ">
        <colgroup>
          <col style={{ width: `${100/headers.length}%` }} />
        </colgroup>
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
          <tr>
            <td className="d-flex border-bottom-0 align-items-center gap-2"> <select
              className="form-select"
              value={defaultField.id}
              onChange={(event) => handleSelection(event)}
            >
              <option value="" disabled>
                Choose {headers[0]}
              </option>
              {data.map((option) => (
                <option key={option.Id} value={option.Id}>
                  {option.Name}
                </option>
              ))}
            </select>
            </td>
            <td>{data.find(option => option.Id == defaultField.id)?.IncomeAccountRef.name}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
