
export const invoiceTableReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { WAFieldName: '', QBProduct: '', QBProductId: '', IncomeAccount: '', class: '', classId: ''}]; // Append new row
    case "DELETE_ROW":
      if (!action.payload || typeof action.payload.index === "undefined") {
        console.error("DELETE_ROW action received undefined index:", action);
        return state; // Return the current state to prevent crashes
      }
      return state.filter((_, index) => index !== action.payload.index); // Remove row at index
    case "CHANGE_WA_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["WAFieldName"]: action.payload.value } // Update specific field
          : row
      );
    case "CHANGE_QB_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["QBProductId"]: action.payload.value,  ["QBProduct"]: action.payload.name, ["IncomeAccount"]: action.payload.incomeAccount} // Update specific field
          : row
      );
    case "CHANGE_CLASS_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["classId"]: action.payload.value,  ["class"]: action.payload.name} // Update specific field
          : row
      );
    default:
      return state;
  }
}


export const donationTableReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { depositAccount: "", depositAccountId: "", WAFieldName: '', QBProduct: '', QBProductId: '', IncomeAccount: '', class: '', classId: ''}]; // Append new row
    case "DELETE_ROW":
      if (!action.payload || typeof action.payload.index === "undefined") {
        console.error("DELETE_ROW action received undefined index:", action);
        return state; // Return the current state to prevent crashes
      }
      return state.filter((_, index) => index !== action.payload.index); // Remove row at index
    case "CHANGE_WA_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["WAFieldName"]: action.payload.value } // Update specific field
          : row
      );
    case "CHANGE_QB_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["QBProductId"]: action.payload.value,  ["QBProduct"]: action.payload.name, ["IncomeAccount"]: action.payload.incomeAccount} // Update specific field
          : row
      );
    case "CHANGE_CLASS_FIELD":
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["classId"]: action.payload.value,  ["class"]: action.payload.name} // Update specific field
          : row
      );
    case "CHANGE_DEPOSIT_FIELD" :
      return state.map((row, index) =>
        index === action.payload.index
          ? { ...row, ["depositAccountId"]: action.payload.value,  ["depositAccount"]: action.payload.name} // Update specific field
          : row
      );
    default:
      return state;
  }
}