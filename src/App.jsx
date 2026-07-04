import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Welcome from "./pages/welcome";
import { UIProvider } from "./context/ui/uiContext";
function App() {
  const [appKey, setAppKey] = useState(0);

  const forceResetApp = () => setAppKey((k) => k + 1);

  return (
    <>
      <UIProvider forceResetApp={forceResetApp}>
        <div key={appKey}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/schoolAssessment" element={<Dashboard />} />
          </Routes>
        </div>
      </UIProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
