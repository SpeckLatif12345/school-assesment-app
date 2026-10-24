import SubmitButton from "./SubmitButton";
import { useSubjectsByClass } from "../../utils/useSubjectByClass";

function CurrentSubject() {
  const { currentSubject } = useSubjectsByClass();
  return (
    <section className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
      {/* Left */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
          Current Subject
        </p>

        <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-800">
          {currentSubject}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Enter continuous assessment and examination marks for each student.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-end">
          <SubmitButton />
        </div>
      </div>
    </section>
  );
}

export default CurrentSubject;
