import { FaUsers } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useStudents } from "../../context/student/studentContext";
import { useApp } from "../../context/app/appContext";
import { useState, useEffect, useRef } from "react";
import SubjectSelector from "../container/SubjectSelector";
import { motion } from "framer-motion";

function StudentTable({}) {
  const { state, dispatch } = useStudents();
  const { state: appState, dispatch: appDispatch } = useApp();
  const [selectedClass, setSelectedClass] = useState("");
  const scrollYRef = useRef(0);

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

  function handleBehaviourChange(id, field, value) {
    dispatch({
      type: "SET_BEHAVIOUR",
      payload: { id, field, value },
    });
  }

  // Toggle fullscreen mode
  function toggleFullscreen() {
    if (!appState.isFullscreen) {
      scrollYRef.current = window.scrollY; // save position
      appDispatch({
        type: "TOGGLE_FULLSCREEN",
      });
    } else {
      appDispatch({
        type: "TOGGLE_FULLSCREEN",
      });
    }
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
    if (total >= 80)
      return "border-emerald-300 bg-emerald-100 text-emerald-800 font-bold";

    if (total >= 65)
      return "border-blue-300 bg-blue-100 text-blue-800 font-bold";

    if (total >= 50)
      return "border-amber-300 bg-amber-100 text-amber-800 font-bold";

    return "border-rose-300 bg-rose-100 text-rose-800 font-bold";
  }

  // Save scroll before entering fullscreen
  useEffect(() => {
    if (appState.isFullscreen) {
      scrollYRef.current = window.scrollY;
    }
  }, [appState.isFullscreen]);

  //  exit from fullscreen
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        appDispatch({
          type: "TOGGLE_FULLSCREEN",
        });
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (appState.isFullscreen) {
      root.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      root.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      root.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [appState.isFullscreen]);

  // Restore scroll after leaving fullscreen
  useEffect(() => {
    if (!appState.isFullscreen) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({
            top: scrollYRef.current,
            behavior: "smooth",
          });
        }, 100);
      });
    }
  }, [appState.isFullscreen]);

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
      }}
      animate={{
        position: appState.isFullscreen ? "fixed" : "relative",
        top: appState.isFullscreen ? 0 : "auto",
        left: appState.isFullscreen ? 0 : "auto",
        inset: 0,
        width: appState.isFullscreen ? "100vw" : "100%",
        height: appState.isFullscreen ? "100vh" : "auto",
        zIndex: appState.isFullscreen ? 9999 : 1,
        backgroundColor: "#fff",
        borderRadius: appState.isFullscreen ? 0 : 12,
      }}
      className="overflow-auto shadow-md"
    >
      <div className="flex items-center justify-center  px-6 py-3  ">
        <div
          className={`flex  items-center justify-between  ${appState.isFullscreen ? `border border-slate-200  rounded-lg bg-slate-50 shadow-md ` : ``}   px-6 py-3   w-full `}
        >
          {!appState.isFullscreen && (
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Student Grades
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Class performance logs, weighted continuous assessment (50%),
                exam weights (50%), and overall final standing.
              </p>
            </div>
          )}
          {appState.isFullscreen && (
            <h2 className=" text-4xl font-bold tracking-tight text-slate-800">
              {state.currentSubject}
            </h2>
          )}
          <div className="flex items-center align-center gap-4  ">
            {appState.isFullscreen && <SubjectSelector />}

            <button
              onClick={toggleFullscreen}
              className=" rounded bg-blue-600 px-4 py-2 text-white "
            >
              {appState.isFullscreen ? "Exit Fullscreen" : "Fullscreen Table"}
            </button>
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto h-[550px]  rounded-lg ">
        <table className="w-full min-w-[1750px] border-separate border-spacing-0 text-left   whitespace-nowrap  ">
          <thead>
            <tr className="   text-xs font-bold tracking-wider text-slate-800  text-center uppercase">
              <th className="  sticky top-0  left-0 z-60         px-6 py-4    font-bold   text-left align-middle  bg-slate-50 border border-slate-800  shadow-md">
                Student Name
              </th>

              <th className="  sticky top-0 z-50 border border-slate-800  px-6 bg-slate-50  shadow-md py-4 text-center font-bold  align-middle">
                <span>Project Work</span> <br /> 20
              </th>
              <th className=" sticky top-0 z-50 border border-slate-800  bg-slate-50  shadow-md px-6 py-4 text-center  font-bold   align-middle">
                <span>Class Work</span> <br /> 40
              </th>
              <th className="sticky top-0 z-50 border border-slate-800  bg-slate-50  shadow-md px-6 py-4 text-center font-bold  align-middle">
                <span>Class Test</span> <br /> 10
              </th>
              <th className="sticky top-0 z-50   border border-slate-800 bg-slate-50  shadow-md px-6 py-4 text-center font-bold   align-middle">
                <span>Class Test</span> <br /> 10
              </th>
              <th className=" sticky top-0 z-50  border border-slate-800  bg-slate-50  shadow-md px-6 py-4 text-center font-bold   align-middle">
                <span>Home Work</span> <br /> 20
              </th>

              <th className="sticky top-0 z-50  border border-slate-800 text-blue-700 bg-slate-50 shadow-md px-6 py-4 text-center font-bold  align-middle">
                <span>Total</span> <br /> 100
              </th>
              <th className="sticky top-0 z-50  border border-slate-800 text-orange-600 bg-slate-50 shadow-md px-6 py-4 text-center font-bold  align-middle">
                <span>Subtotal A</span> <br /> 50%
              </th>
              <th className=" sticky top-0 z-50  border border-slate-800  bg-slate-50 shadow-md px-6 py-4 text-center font-bold  align-middle">
                {" "}
                <span>Exams </span> <br /> Score
              </th>
              <th className=" sticky top-0 z-50 border border-slate-800 text-orange-600  bg-slate-50 shadow-md px-6 py-4 text-center font-bold  align-middle">
                <span>Exams Score B</span> <br /> 50%
              </th>
              <th className=" sticky top-0 z-50 border border-slate-800  bg-slate-50 shadow-md px-6 py-4 text-center font-bold  align-middle">
                <span>Total </span> <br /> A + B
              </th>
              <th className=" sticky top-0 z-50 border border-slate-800  bg-slate-50 shadow-md px-6 py-4 text-center font-bold   align-middle">
                {" "}
                Attendance
              </th>

              <th className=" sticky top-0 z-50 border border-slate-800  bg-slate-50 shadow-md px-6 py-4 text-center font-bold  align-middle">
                {" "}
                Promoted to{" "}
              </th>
              <th className=" sticky top-0 z-50  border border-slate-800  bg-slate-50 shadow-md px-6 py-4 text-center font-bold   align-middle">
                Conduct
              </th>
              <th className="  sticky top-0 z-50  border border-slate-800  bg-slate-50 shadow-md px-6 py-4 text-center font-bold   align-middle">
                Attitude
              </th>
              <th className=" sticky top-0 z-50 border border-slate-800  bg-slate-50 shadow-md px-6 py-4 text-center font-bold  align-middle">
                Interest
              </th>
              <th className="sticky top-0 z-50  border border-slate-800  bg-slate-50 shadow-md px-6 py-4 text-center font-bold   align-middle">
                <span>Class Teacher's</span> <br /> Remarks
              </th>

              <th className="  sticky top-0 z-50  border border-slate-800  bg-slate-50 shadow-md w-20 px-6 py-4 text-center   align-middle">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {state.students.map((student) => {
              const subj = student.subjects?.[state.currentSubject] || {};
              const totalA =
                Number(subj.classPercent) + Number(subj.examPercent);

              return (
                <tr
                  key={student.id}
                  className="group transition-colors hover:bg-slate-50/40  "
                >
                  <td className=" sticky left-0 z-30 px-6 py-4  bg-slate-50  border border-slate-800  text-sm font-bold text-slate-800 shadow-sm">
                    {student.name}
                  </td>

                  <td className="px-6 py-4 text-center   border border-slate-800 ">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={subj.projectWork || ""}
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
                  <td className="px-6 py-4 text-center   border border-slate-800 ">
                    <input
                      type="number"
                      min="0"
                      max="40"
                      value={subj.classWork || ""}
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
                  <td className="px-6 py-4 text-center  border border-slate-800 ">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={subj.classTestOne || ""}
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
                  <td className="px-6 py-4 text-center  border border-slate-800 ">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={subj.classTestTwo || ""}
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
                  <td className="px-6 py-4 text-center  border border-slate-800 ">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={subj.HomeWork || ""}
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
                  <td className="px-6 py-4 text-center text-sm  text-blue-700 font-bold border border-slate-800 ">
                    {Math.round(subj.totalB) || 0}
                  </td>

                  <td className="px-6 py-4 text-center text-sm font-bold text-orange-600  border border-slate-800 ">
                    {Math.round(subj.classPercent) || 0}%
                  </td>

                  <td className="px-6 py-4 text-center  border-b  border-l border-r border-t ">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={subj.examScore || ""}
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

                  <td className="px-6 py-4 text-center text-sm font-bold text-orange-600   border border-slate-800 ">
                    {Math.round(subj.examPercent) || 0}%
                  </td>

                  <td className="px-6 py-4 text-center  border border-slate-800 ">
                    <span
                      className={`inline-flex items-center justify-center rounded-full  shadow-sm border px-3 py-1 text-xs font-bold${totalBadgeClass(totalA)}
                    )}`}
                    >
                      {Math.round(totalA) || 0}%
                    </span>
                  </td>

                  {/* attendance */}
                  <td className="px-6 py-4 text-center  border border-slate-800 ">
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

                  <td className="  px-6 py-4 text-center  border border-slate-800 ">
                    <select
                      value={student.promoted_to || ""}
                      onChange={(e) => {
                        if (state.currentSubject) {
                          handlePromotedToChange(student.id, e.target.value);
                        } else {
                          toast.error("Please select a subject first.");
                        }
                      }}
                      className="w-32 text-center border rounded px-1 py-0.5 text-xs"
                    >
                      <option value="">select class</option>
                      {appState.class_names.map((className) => (
                        <option key={className} value={className}>
                          {className}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Conduct */}
                  <td className="px-6 py-4 text-center  border border-slate-800 ">
                    <input
                      type="text"
                      placeholder="optional"
                      value={student.behaviour?.conduct || ""}
                      onChange={(e) =>
                        handleBehaviourChange(
                          student.id,
                          "conduct",
                          e.target.value,
                        )
                      }
                      className="w-24 rounded border px-2 py-1 text-xs text-center"
                    />
                  </td>

                  {/* Attitude */}
                  <td className="px-6 py-4 text-center  border border-slate-800 ">
                    <input
                      type="text"
                      placeholder="optional"
                      value={student.behaviour?.attitude || ""}
                      onChange={(e) =>
                        handleBehaviourChange(
                          student.id,
                          "attitude",
                          e.target.value,
                        )
                      }
                      className="w-24 rounded border px-2 py-1 text-xs text-center"
                    />
                  </td>

                  {/* Interest */}
                  <td className="px-6 py-4 text-center  border border-slate-800 ">
                    <input
                      placeholder="optional"
                      type="text"
                      value={student.behaviour?.interest || ""}
                      onChange={(e) =>
                        handleBehaviourChange(
                          student.id,
                          "interest",
                          e.target.value,
                        )
                      }
                      className="w-24 rounded border px-2 py-1 text-xs text-center"
                    />
                  </td>

                  {/* Class Teacher's Remarks */}
                  <td className="px-6 py-4 text-center border border-slate-800">
                    <textarea
                      value={student.behaviour?.class_teacher_remarks || ""}
                      onChange={(e) =>
                        handleBehaviourChange(
                          student.id,
                          "class_teacher_remarks",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="w-48 resize-y rounded border px-2 py-1 text-xs"
                      placeholder="optional"
                    />
                  </td>
                  <td className="px-6 py-4 text-center  border border-slate-800">
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
    </motion.div>
  );
}
export default StudentTable;
