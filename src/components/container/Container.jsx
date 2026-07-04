import SubjectSelector from "./SubjectSelector";
import RosterEnrolled from "./RosterEnrolled";
import TotalAttendance from "./TotalAttendance";
function Container() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex h-32 flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-slate-200">
        <SubjectSelector />
      </div>
      <div className="flex h-32 flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-slate-200">
        <RosterEnrolled />
      </div>
      <div className="flex h-32 flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-slate-200">
        <TotalAttendance />
      </div>
    </section>
  );
}
export default Container;
