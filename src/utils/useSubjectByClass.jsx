import { useMemo, useEffect } from "react";
import { useStudents } from "../context/student/studentContext";
import { useApp } from "../context/app/appContext";

function getSubjectLevel(className) {
  const name = className.toUpperCase();
  if (name.startsWith("CLASS")) return "Class";
  if (name.startsWith("JSS") || name.startsWith("JHS")) return "JHS";
  return "Class";
}

export function useSubjectsByClass() {
  const { state: appState } = useApp();
  const { state: studentState, dispatch } = useStudents();

  const selectedClass = appState.selectedClass || "";
  const currentSubject = studentState.currentSubject;
  const subjects = studentState.subjects;

  // get subject level
  const subjectLevel = useMemo(
    () => getSubjectLevel(selectedClass),
    [selectedClass],
  );

  // subjects
  const availableSubjects = useMemo(() => {
    if (
      selectedClass == "CLASS ONE" ||
      selectedClass == "CLASS TWO" ||
      selectedClass == "CLASS THREE"
    ) {
      const classSubjects = [...(subjects[subjectLevel] || [])];
      const filteredSubjects = classSubjects.filter(
        (subject) => subject !== "Twi",
      );
      return filteredSubjects;
    }

    if (
      selectedClass !== "CLASS ONE" &&
      selectedClass !== "CLASS TWO" &&
      selectedClass !== "CLASS THREE"
    ) {
      const classSubjects = [...(subjects[subjectLevel] || [])];
      const filteredSubjects = classSubjects.filter(
        (subject) => subject !== "Writing",
      );
      return filteredSubjects;
    }

    return subjects[subjectLevel] || [];
  }, [studentState.subjects, appState.selectedClass]);

  // If current subject is not in the list, switch to the first one
  useEffect(() => {
    if (!availableSubjects.includes(currentSubject)) {
      dispatch({
        type: "SET_SUBJECT",
        payload: availableSubjects[0],
      });
    }
  }, [selectedClass, availableSubjects, currentSubject, dispatch]);

  return {
    subjectLevel, // "Class" | "JHS"
    availableSubjects, // string[]
    currentSubject,
    totalSubjects: availableSubjects.length,
  };
}
