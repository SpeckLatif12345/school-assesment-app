import StudentTable from "./StudentTable";
function TableContainer() {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col   items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/30 p-5 sm:flex-row sm:items-center"></div>
      <StudentTable />
    </section>
  );
}
export default TableContainer;
