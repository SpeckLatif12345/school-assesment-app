import { FaTrash, FaUsers } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useStudents } from "../../context/student/studentContext";
import { useApp } from "../../context/app/appContext";
import { useState } from "react";
function StudentTable({}) {
  const { state, dispatch } = useStudents();
  const { state: appState } = useApp();
  const [selectedClass, setSelectedClass] = useState("");

  // Handle score change for a student
  function handleScoreChange(id, field, value) {
    dispatch({
      type: "SET_SCORE",
      payload: { id, field, value },
    });
  }

  function handleAttendanceChange(id, value) {
    dispatch({
      type: "SET_STUDENT_ATTENDANCE",
      payload: { id, value },
    });
  }

  function handlePromotedToChange(id, value) {
    dispatch({
      type: "SET_PROMOTED_TO",
      payload: { id, value },
    });
  }

  // Remove student by ID
  const removeStudent = (id) => {
    dispatch({
      type: "REMOVE_STUDENT",
      payload: id,
    });

    toast.info("Student removed");
  };

  function totalBadgeClass(total) {
    if (total >= 80) return "border-emerald-100 bg-emerald-50 text-emerald-700";
    if (total >= 65) return "border-blue-100 bg-blue-50 text-blue-700";
    if (total >= 50) return "border-amber-100 bg-amber-50 text-amber-700";
    return "border-rose-100 bg-rose-50 text-rose-700";
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-175 border-collapse text-left   whitespace-nowrap">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold tracking-wider text-slate-500">
            <th className="px-6 py-4 font-bold">Student Name</th>

            <th className="px-6 py-4 text-center font-bold">
              <span>Project Work</span> <br /> 20
            </th>
            <th className="px-6 py-4 text-center font-bold">
              <span>Class Work</span> <br /> 40
            </th>
            <th className="px-6 py-4 text-center font-bold">
              <span>Class Test</span> <br /> 10
            </th>
            <th className="px-6 py-4 text-center font-bold">
              <span>Class Test</span> <br /> 10
            </th>
            <th className="px-6 py-4 text-center font-bold">
              <span>Home Work</span> <br /> 20
            </th>

            <th className="px-6 py-4 text-center font-bold text-slate-800">
              <span>Total</span> <br /> 100
            </th>
            <th className="px-6 py-4 text-center font-bold text-slate-800">
              <span>Subtotal A</span> <br /> 50%
            </th>
            <th className="px-6 py-4 text-center font-bold"> Exams Score </th>
            <th className="px-6 py-4 text-center font-bold text-slate-800">
              <span>Exams Score B</span> <br /> 50%
            </th>
            <th className="px-6 py-4 text-center font-bold text-slate-800">
              <span>Total </span> <br /> A + B
            </th>
            <th className="px-6 py-4 text-center font-bold"> Attendance</th>

            <th className="px-6 py-4 text-center font-bold"> Promoted to </th>

            <th className="w-20 px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {state.students.map((student) => {
            const subj = student.subjects?.[state.currentSubject] || {};
            const totalA = Number(subj.classPercent) + Number(subj.examPercent);

            return (
              <tr
                key={student.id}
                className="group transition-colors hover:bg-slate-50/40"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-slate-800">
                    {student.name}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={subj.projectWork || 0}
                    onChange={(e) => {
                      if (state.currentSubject) {
                        handleScoreChange(
                          student.id,
                          "projectWork",
                          e.target.value,
                        );
                      } else {
                        toast.error("Please select a subject first.");
                      }
                    }}
                    className="mx-auto w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={subj.classWork || 0}
                    onChange={(e) => {
                      if (state.currentSubject) {
                        handleScoreChange(
                          student.id,
                          "classWork",
                          e.target.value,
                        );
                      } else {
                        toast.error("Please select a subject first.");
                      }
                    }}
                    className="mx-auto w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={subj.classTestOne || 0}
                    onChange={(e) => {
                      if (state.currentSubject) {
                        handleScoreChange(
                          student.id,
                          "classTestOne",
                          e.target.value,
                        );
                      } else {
                        toast.error("Please select a subject first.");
                      }
                    }}
                    className="mx-auto w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={subj.classTestTwo || 0}
                    onChange={(e) => {
                      if (state.currentSubject) {
                        handleScoreChange(
                          student.id,
                          "classTestTwo",
                          e.target.value,
                        );
                      } else {
                        toast.error("Please select a subject first.");
                      }
                    }}
                    className="mx-auto w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={subj.HomeWork || 0}
                    onChange={(e) => {
                      if (state.currentSubject) {
                        handleScoreChange(
                          student.id,
                          "HomeWork",
                          e.target.value,
                        );
                      } else {
                        toast.error("Please select a subject first.");
                      }
                    }}
                    className="mx-auto w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </td>
                <td className="px-6 py-4 text-center text-sm font-bold text-slate-500">
                  {Math.round(subj.totalB) || 0}
                </td>

                <td className="px-6 py-4 text-center text-sm font-bold text-slate-500">
                  {Math.round(subj.classPercent) || 0}%
                </td>

                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={subj.examScore || 0}
                    onChange={(e) => {
                      if (state.currentSubject) {
                        handleScoreChange(
                          student.id,
                          "examScore",
                          e.target.value,
                        );
                      } else {
                        toast.error("Please select a subject first.");
                      }
                    }}
                    className="mx-auto w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </td>

                <td className="px-6 py-4 text-center text-sm font-bold text-slate-500">
                  {Math.round(subj.examPercent) || 0}%
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-bold${totalBadgeClass(totalA)}
                    )}`}
                  >
                    {Math.round(totalA) || 0}%
                  </span>
                </td>

                {/* attendance */}
                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={student.attendance || 0}
                    onChange={(e) => {
                      if (state.currentSubject) {
                        handleAttendanceChange(student.id, e.target.value);
                      } else {
                        toast.error("Please select a subject first.");
                      }
                    }}
                    className="mx-auto w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </td>

                <td className="border p-1">
                  <select
                    value={student.promoted_to || ""}
                    onChange={(e) => {
                      if (state.currentSubject) {
                        handlePromotedToChange(student.id, e.target.value);
                      } else {
                        toast.error("Please select a subject first.");
                      }
                    }}
                    className="w-24 border rounded px-1 py-0.5 text-xs"
                  >
                    <option value="">Select class</option>
                    {appState.class_names.map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => removeStudent(student.id)}
                    className="rounded-lg border border-slate-100 p-1.5 text-slate-400 transition-all hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* if no students */}
      {!state.students.length && (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
            <FaUsers className="h-8 w-8 text-slate-400" />
          </div>
          <p className="font-bold text-slate-600">
            No students in this class roster
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Use the entry form below to begin cataloging assessment data.
          </p>
        </div>
      )}
    </div>
  );
}
export default StudentTable;
