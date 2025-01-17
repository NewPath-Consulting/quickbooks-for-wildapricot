
interface MappingTableProps {
  headers: string[]; // Table headers
  data: { id: number; name: string }[]; // Data to map (e.g., membership levels)
  mappingOptions: { id: number; name: string }[]; // Options for dropdown (e.g., products)
  onMappingChange ?: (itemName: string, optionId: string, optionName: string) => void; // Callback for selection,
  dropdownDefaultName: string
}

export const MappingTable = ({headers, data, mappingOptions, dropdownDefaultName, onMappingChange}: MappingTableProps) => {

  const handleMapping = (event, itemName) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const value = selectedOption.value; // option's value
    const name = selectedOption.text;  // option's name (text inside <option>)

    if (onMappingChange) {
      onMappingChange(itemName, value, name)
    }

  }

  return (
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
        {data.map((item) => (
          <div key={item.id} className="row align-items-center">
            <p className="col-5">{item.name}</p>
            <i className="bi bi-arrow-right col-1" style={{ color: "#c5c5c5" }}></i>
            <div className="col-6">
              <select
                className="form-select"
                id={`mapping-${item.id}`}
                defaultValue={""}
                onChange={(event) => handleMapping(event, item.name)}
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
          </div>
        ))}
      </div>
    </div>
  );
};
