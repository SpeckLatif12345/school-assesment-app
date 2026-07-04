import { createContext, useContext, useReducer } from "react";
import { initialState } from "./studentReducer";
import studentReducer from "./studentReducer";

//  Create context
const StudentContext = createContext(null);

//  Provider
export function StudentProvider({ children }) {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  return (
    <StudentContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
}

//  Custom hook (clean access)
export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used inside StudentProvider");
  }
  return context;
}
