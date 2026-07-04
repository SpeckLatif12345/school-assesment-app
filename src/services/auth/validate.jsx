import { Navigate } from "react-router-dom";
import { useApp } from "../../context/app/appContext";
import { useEffect, useState } from "react";

function RequireSignIn({ children }) {
  const [authorized, setAuthorized] = useState(null);

  const hasSignedIn = localStorage.getItem("sign-in") === "true";

  /*
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_BASE;
    async function checkTeacher() {
      try {
        const response = await fetch(`${API_URL}/api/teacher/${selectedClass}`);

        if (!response.ok && response.status >= 400 && response.status < 500) {
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      } catch (error) {
        setAuthorized(false);
      }
    }

    checkTeacher();
  }, []);

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/schooldesk" />;
  }*/

  if (!hasSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default RequireSignIn;
