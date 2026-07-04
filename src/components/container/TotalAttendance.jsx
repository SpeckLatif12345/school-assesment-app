import { FaUsers } from "react-icons/fa";
import { useStudents } from "../../context/student/studentContext";
import { useApp } from "../../context/app/appContext";
function TotalAttendance() {
  const { state } = useStudents();
  const { state: appState } = useApp();
  return (
    <div className="flex h-32 flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Total Attendance
        </span>
        <FaUsers className="h-4 w-4 text-slate-400" />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-800">
          {appState.totalAttendance}
        </span>
      </div>
    </div>
  );
}
export default TotalAttendance;
