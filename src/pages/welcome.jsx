import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/app/appContext";
import { useStudents } from "../context/student/studentContext";
import { toast } from "react-toastify";
import * as XLSX from "xlsx"; // csv
// pdf
import mammoth from "mammoth"; // word

function Welcome() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    state,
    dispatch: appDispatch,
    chooseClass,
    totalAttendance,
  } = useApp();
  const { state: studentState, dispatch: studentDispatch } = useStudents();
  const navigate = useNavigate();

  function handleContinue() {
    if (!state.selectedClass) return;
    setLoading(true);

    setTimeout(() => {
      navigate("/schoolAssessment");
      setLoading(false);
    }, 2000);

    // home
  }
  // Function to import students from a file
  async function importStudents(file) {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    appDispatch({
      type: "SET_IMPORT_STATUS",
      payload: true,
    });

    const ext = file.name.split(".").pop().toLowerCase();
    let names = [];

    switch (ext) {
      case "txt": {
        // import txt
        const text = await file.text();
        names = text
          .split("\n")
          .map((name) => name.trim())
          .filter(Boolean);
        break;
      }

      case "xls":
      case "xlsx":
      case "csv": {
        // import excel
        const data = await file.arrayBuffer();

        const workbook = XLSX.read(data);

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json(sheet);

        names = rows.map((row) => {
          const value = Object.values(row)[0];
          return String(value).trim();
        });
        break;
      }

      case "docx": {
        // import word
        const result = await mammoth.extractRawText({
          arrayBuffer: await file.arrayBuffer(),
        });

        names = result.value
          .split("\n")
          .map((x) => x.trim())
          .filter(Boolean);
        break;
      }

      case "json":
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);

            studentDispatch({
              type: "FETCH_STUDENTS",
              payload: data.students,
            });
            setFileName(file.name);

            appDispatch({
              type: "SET_TOTAL_ATTENDANCE",
              payload: data.totalAttendance || 0,
            });

            toast.success(
              `${data.students.length} students imported successfully`,
            );
          } catch (error) {
            toast.error("Invalid JSON file.");
          }
        };

        reader.readAsText(file);
        return;

      default:
        toast.error("Unsupported file");
    }

    // Convert to student objects
    const studentObjects = names.map((name) => ({
      id: `id-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      subjects: {},
      attendance: 0,
      promoted_to: "",
      behaviour: {
        conduct: "",
        attitude: "",
        interest: "",
        class_teacher_remarks: "",
      },
    }));
    studentDispatch({
      type: "FETCH_STUDENTS",
      payload: studentObjects,
    });

    setFileName(file.name);

    toast.success(`${studentObjects.length} students imported successfully`);
  }

  useEffect(() => {
    const saved = localStorage.getItem(`${state.selectedClass}`);
    const reportData = JSON.parse(saved);
    if (saved && reportData.class === state.selectedClass) {
      const new_reportData = {
        ...reportData,
        totalAttendance: state.totalAttendance,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(
        `${state.selectedClass}`,
        JSON.stringify(new_reportData),
      );
    }
  }, [state.totalAttendance]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Welcome, Teacher 👋
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Please select your class to get started
        </p>

        <div>
          <select
            value={state.selectedClass}
            onChange={(e) => chooseClass(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
          >
            <option value="">Select your class</option>
            {state.class_names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {/* FILE */}

        <div className="mt-2">
          <label className="font-semibold">Import Students</label>

          <input
            type="file"
            accept=".txt,.csv,.xlsx,.xls,.json,.docx"
            onChange={(e) => importStudents(e.target.files[0])}
            className="mt-2 w-full border rounded px-3 py-2"
          />

          <p className="text-xs text-gray-500 mt-2">
            Supported files: TXT, CSV, XLSX, XLS ,JSON, DOCX. Each line or row
            should contain a single student name.
          </p>

          {fileName && (
            <p className="mt-2 text-green-600 font-medium">
              📄 {fileName} {": "}
              <span className="mt-1 text-blue-600">
                {studentState.students.length > 0 && (
                  <span>{studentState.students.length} Students Imported </span>
                )}
              </span>
            </p>
          )}
        </div>

        <div className=" w-full  mt-4 mb-4 text-center">
          <label className="font-semibold px-0.5 mx-0.5 text-sm text-gray-700">
            Total Attendance
          </label>
          {/* attendance */}

          <input
            type="number"
            placeholder="0"
            min="0"
            max="100"
            value={state.totalAttendance || ""}
            onChange={(e) => {
              if (state.selectedClass) {
                totalAttendance(Number(e.target.value));
              } else {
                toast.error("Please select a class first.");
              }
            }}
            className="mx-auto w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>

        <button
          onClick={handleContinue}
          disabled={!state.selectedClass}
          className={`w-full py-2 rounded text-white  flex items-center justify-center transition
            ${
              state.selectedClass
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}

export default Welcome;
