import { FaBookOpen, FaChevronDown } from "react-icons/fa";
import { useStudents } from "../../context/student/studentContext";
import { useApp } from "../../context/app/appContext";
import { useSubjectsByClass } from "../../utils/useSubjectByClass";

function SubjectSelector() {
  const { state, dispatch } = useStudents();
  const { state: appState } = useApp();
  const { availableSubjects, currentSubject } = useSubjectsByClass();

  const handleSubjectChange = (subject) => {
    dispatch({
      type: "SET_SUBJECT",
      payload: subject,
    });
  };

  return appState.isFullscreen ? (
    <div className="relative ">
      <select
        value={currentSubject}
        onChange={(event) => handleSubjectChange(event.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        {availableSubjects.map((subject) => (
          <option
            key={subject}
            value={subject}
            className="text-sm font-semibold text-slate-700"
          >
            {subject}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  ) : (
    <div className="flex h-32 flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Subject Selector
        </span>

        <FaBookOpen className="text-slate-400" />
      </div>

      {/* Select */}
      <div className="relative mt-3">
        <select
          value={currentSubject}
          onChange={(event) => handleSubjectChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        >
          {availableSubjects.map((subject) => (
            <option
              key={subject}
              value={subject}
              className="text-sm font-semibold text-slate-700"
            >
              {subject}
            </option>
          ))}
        </select>

        <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

export default SubjectSelector;
