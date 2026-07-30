import { FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import { useApp } from "../context/app/appContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/student/studentContext";
import { confirm } from "@tauri-apps/plugin-dialog";

function Header() {
  const { state, dispatch: appDispatch, resetSetup } = useApp();
  const navigate = useNavigate();
  const { dispatch } = useStudents();

  // reset to login again
  const handleReset = useCallback(async () => {
    const confirmReset = await confirm(
      "Are you sure you want to logout? All your data will be cleared",
    );

    if (!confirmReset) return;

    const saved = localStorage.getItem(`${state.selectedClass}`);
    const reportData = JSON.parse(saved);

    if (saved && reportData.class === state.selectedClass) {
      localStorage.removeItem(`${state.selectedClass}`);
    }

    // clearing import status
    appDispatch({
      type: "SET_IMPORT_STATUS",
      payload: false,
    });

    // clearing students
    dispatch({ type: "CLEAR_STUDENTS" });

    setTimeout(() => {
      resetSetup();
      navigate("/", { replace: true });
    }, 0);
  }, [dispatch, resetSetup, navigate]);

  return (
    <header className="border-b border-slate-800 bg-slate-900 px-6 py-5 text-white md:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        {/* Left */}

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <FaGraduationCap className="text-3xl text-white" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              Academic Portal
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
              Student Assessment Dashboard
            </h1>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-5 py-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-400"></span>

          <FaCheckCircle className="text-emerald-400" />

          <span className="text-sm font-semibold text-emerald-200">
            {state.selectedClass}
          </span>
          {/* Reset Button */}
          <button
            className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            onClick={handleReset}
          >
            logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
