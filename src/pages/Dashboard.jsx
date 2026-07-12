import Header from "../components/Header";
import CurrentSubject from "../components/currentSubject/CurrentSubject";
import Container from "../components/container/Container";
import TableContainer from "../components/table/TableContainer";
import AddStudentForm from "../components/forms/AddStudentForm";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-4 md:p-8">
      <main className="mx-auto w-full  rounded-3xl border border-slate-200 bg-white shadow-2xl px-0.5">
        <Header />
        <div className="space-y-8 p-6 md:p-8">
          <CurrentSubject />
          <Container />
          <TableContainer />
          <AddStudentForm />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
