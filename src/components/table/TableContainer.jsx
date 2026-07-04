import StudentTable from "./StudentTable";
function TableContainer() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/30 p-5 sm:flex-row sm:items-center">
        {/* header */}
        <div>
          <h3 className="text-lg font-bold text-slate-800">Student Grades</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Class performance logs, weighted continuous assessment (50%), exam
            weights (50%), and overall final standing.
          </p>
        </div>
        {/* end of header */}
      </div>
      <StudentTable />
    </section>
  );
}
export default TableContainer;
