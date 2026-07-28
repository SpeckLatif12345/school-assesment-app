import { createContext, useContext, useReducer } from "react";
import { initialState, appReducer } from "./appReducer";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  //  Save class choice (first-time setup)
  function chooseClass(className) {
    dispatch({ type: "SET_CLASS", payload: className });
  }

  function totalAttendance(attendance) {
    dispatch({ type: "SET_TOTAL_ATTENDANCE", payload: attendance });
  }

  //  allows resetting the app (for testing or if user wants to change class)
  function resetSetup() {
    dispatch({ type: "CLEAR_CLASS" });
    dispatch({ type: "CLEAR_TOTAL_ATTENDANCE" });
  }

  return (
    <AppContext.Provider
      value={{ state, dispatch, chooseClass, totalAttendance, resetSetup }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
