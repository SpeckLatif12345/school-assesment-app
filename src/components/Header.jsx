import { FaGraduationCap, FaCheckCircle, FaClock } from "react-icons/fa";
import { useApp } from "../context/app/appContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/student/studentContext";
import { useUI } from "../context/ui/uiContext";

function Header({ submitted = true }) {
  const { state, resetSetup } = useApp();
  const navigate = useNavigate();
  const { dispatch } = useStudents();
  const { forceResetApp } = useUI(); // stopped here because the user requested not to suggest code that has been deleted.

  // reset to login again
  const handleReset = useCallback(() => {
    const confirmReset = window.confirm("Are you sure you want to logout?");

    if (!confirmReset) return;

    dispatch({ type: "CLEAR_STUDENTS" });
    resetSetup();

    setTimeout(() => {
      forceResetApp();
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

        {submitted ? (
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
        ) : (
          <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/70 px-5 py-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-amber-400"></span>

            <FaClock className="text-amber-400" />

            <span className="text-sm font-semibold text-amber-200">
              Open for Evaluation
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
