import { FaCheckCircle, FaLock } from "react-icons/fa";
import { useStudents } from "../../context/student/studentContext";
import { useApp } from "../../context/app/appContext";

function SubmitButton({ submitted = false }) {
  const { state, dispatch } = useStudents();
  const { state: appState } = useApp();

  const handleSave = () => {
    const reportData = {
      school: "Chrispal International School",
      class: appState.selectedClass,
      students: [...state.students],
    };
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
    });
  };

  return (
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
          Grades Saved,Save Again?
        </>
      ) : (
        <>
          <FaCheckCircle />
          Save Grades
        </>
      )}
    </button>
  );
}

export default SubmitButton;
