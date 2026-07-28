import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { useStudents } from "../../context/student/studentContext";
import { toast } from "react-toastify";
function AddStudentForm() {
  const { dispatch } = useStudents();
  const [name, setname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please fill all fields");
      return;
    }

    const student = {
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
    };

    dispatch({
      type: "ADD_STUDENT",
      payload: student,
    });
    toast.success(" Student Successfully Added");
    setname("");
  };

  return (
    <section className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 ">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <FaPlus className="h-4 w-4" />
        </div>
        <h4 className="font-bold text-slate-800">Add New Student to Roster</h4>
      </div>

      <form
        className="grid grid-cols-1 items-end gap-4 md:grid-cols-4"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1.5 md:col-span-2">
          <label
            htmlFor="new-student-name"
            className="block text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            Full Name
          </label>
          <input
            id="new-student-name"
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            placeholder="e.g. Kwabena Appiah"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="md:col-span-1">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-slate-900"
          >
            <FaPlus className="h-4 w-4" />
            Add Student
          </button>
        </div>
      </form>
    </section>
  );
}
export default AddStudentForm;
