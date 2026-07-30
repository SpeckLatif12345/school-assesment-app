import { FaCheckCircle, FaLock } from "react-icons/fa";
import { useStudents } from "../../context/student/studentContext";
import { useApp } from "../../context/app/appContext";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useFileSave } from "../../utils/useFileSave";

function SubmitButton({ submitted = false }) {
  const { state, dispatch } = useStudents();
  const { state: appState, dispatch: appDispatch } = useApp();
  const hasRestored = useRef(false);
  const { saveAs } = useFileSave();

  // AUTO SAVE
  useEffect(() => {
    const reportData = {
      school: "Chrispal International School",
      class: appState.selectedClass,
      students: [...state.students],
      totalAttendance: appState.totalAttendance,
      savedAt: new Date().toISOString(),
    };

    if (state.students.length > 0) {
      localStorage.setItem(
        `${appState.selectedClass}`,
        JSON.stringify(reportData),
      );
    }
  }, [state.students]);

  // load students if available
  useEffect(() => {
    const saved = localStorage.getItem(`${appState.selectedClass}`);

    if (saved && !hasRestored.current && !appState.hasImported) {
      hasRestored.current = true;

      const reportData = JSON.parse(saved);

      dispatch({
        type: "FETCH_STUDENTS",
        payload: reportData.students || {},
      });

      appDispatch({
        type: "SET_TOTAL_ATTENDANCE",
        payload: reportData.totalAttendance || 0,
      });

      toast.success("your data has successfully been restored");
    }
  }, []);

  const handleSave = async () => {
    const reportData = {
      school: "Chrispal International School",
      class: appState.selectedClass,
      students: [...state.students],
      totalAttendance: appState.totalAttendance,
    };

    const saved = await saveAs(reportData, appState.selectedClass);

    if (saved) {
      toast.success("Grades Saved Successfully");
    }

    /*
    // convert into json format to download
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${appState.selectedClass}.json`;
    a.click();

    URL.revokeObjectURL(url);
    dispatch({
      type: "GRADES_SAVED",
    }); */
  };

  return (
    <div className="relative group inline-block">
      <button
        onClick={handleSave}
        className={`flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-md transition duration-200 hover:scale-[1.02] active:scale-95
        ${
          state.saved
            ? "bg-slate-600 hover:bg-slate-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {state.saved ? (
          <>
            <FaLock />
            Grades Saved
          </>
        ) : (
          <>
            <FaCheckCircle />
            Save Grades
          </>
        )}
      </button>

      {/* Tooltip */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 
                  hidden group-hover:block
                  bg-black text-white text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap"
      >
        {state.saved ? "Click to save again" : "Click to save grades"}
      </div>
    </div>
  );
}

export default SubmitButton;
