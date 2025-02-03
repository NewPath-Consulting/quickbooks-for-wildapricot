
interface ReviewMappingTableProps {
  mappingList: any[],
  headers: string[],
  columns: string[]
}

interface ReviewDefaultMappingTableProps {
  defaultFields: {},
  headers: string[],
  columns: string[]
}

export const ReviewMappingTable = ({ mappingList, headers, columns }: ReviewMappingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-striped">
        <colgroup>
          {headers.map((_, index) => (
            <col key={index} width={`${100 / headers.length}%`} />
          ))}
        </colgroup>
        <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {mappingList?.map((value, index) => {
          const isValidRow = columns.every((col) => value[col]); // Ensure all required columns exist
          if (!isValidRow) return null; // Skip invalid rows

          return (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col === "WAFieldName" || col === "WATender" ? (
                    <div className="td-container">
                      {value[col]}
                      <i className="bi bi-arrow-right"></i>
                    </div>
                  ) : (
                    value[col]
                  )}
                </td>
              ))}
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export const ReviewDefaultMappingTable = ({ defaultFields, headers, columns }: ReviewDefaultMappingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-bordered table-striped">
        <colgroup>
          {headers.map((_, index) => (
            <col key={index} width={`${100 / headers.length}%`} />
          ))}
        </colgroup>
        <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {columns.every((col) => defaultFields?.[col]) && (
          <tr>
            {columns.map((col, index) => (
              <td key={index}>{defaultFields?.[col] || ""}</td>
            ))}
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};
