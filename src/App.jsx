import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Welcome from "./pages/welcome";
import RequireSignIn from "./services/auth/validate";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/schoolAssessment"
          element={
            <RequireSignIn>
              <Dashboard />
            </RequireSignIn>
          }
        />
      </Routes>

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
