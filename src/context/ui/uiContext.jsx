import { createContext, useContext } from "react";

const UIContext = createContext(null);

export function UIProvider({ children, forceResetApp }) {
  return (
    <UIContext.Provider value={{ forceResetApp }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}
