//  Initial global state
export const initialState = {
  students: [],
  currentSubject: "Mathematics",
  submittedSubjects: {}, //  { Math: true, English: false }
  subjects: [
    "Mathematics",
    "Integrated Science",
    "Social Studies",
    "Creative Arts",
    "Twi",
    "French",
    "Religious & Moral Education",
    "Computing",
  ],
  name: "",
  saved: false,
  tableData: [
    "PROJECT WORK 20",
    "CLASS WORK 40",
    "CLASS TEST 10",
    "CLASS TEST 10",
    "HOME WORK 20",
    "TOTAL 100%",
    "SUBTOTAL 50%",
    "EXAMS SCORE ",
    "EXAMS SCORE 50%",
    "TOTAL A + B",
  ],
};

//  Reducer (ALL logic lives here)
function studentReducer(state, action) {
  switch (action.type) {
    case "FETCH_STUDENTS":
      return {
        ...state,
        students: action.payload,
      };

    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case "REMOVE_STUDENT": {
      return {
        ...state,
        students: state.students.filter((s) => s.id !== action.payload),
      };
    }

    case "SET_SUBJECT": {
      return {
        ...state,
        currentSubject: action.payload,
      };
    }

    case "SET_SCORE": {
      const { id, field, value } = action.payload;
      const titles = [
        "projectWork",
        "classWork",
        "classTestOne",
        "classTestTwo",
        "HomeWork",
      ];

      return {
        ...state,
        students: state.students.map((student) => {
          if (student.id === id) {
            const currentSubject =
              student.subjects?.[state.currentSubject] || {};
            // Update the edited field
            const updatedSubject = {
              ...currentSubject,
              [field]: Number(value),
            };
            // Calculate the total score for the subject
            const totalB = titles.reduce((sum, key) => {
              return sum + Number(updatedSubject[key] || 0);
            }, 0);
            //  percentage 50%
            const classPercent = (totalB / 100) * 50;

            // Exam percentage 50%
            const examPercent =
              (Number(updatedSubject.examScore || 0) / 100) * 50;

            return {
              ...student,
              subjects: {
                ...student.subjects,
                [state.currentSubject]: {
                  ...student.subjects?.[state.currentSubject],
                  [field]: value,
                  classPercent,
                  examPercent,
                  totalB,
                },
              },
            };
          } else {
            return student;
          }
        }),
      };
    }

    case "MARK_SUBMITTED": {
      return {
        ...state,
        submittedSubjects: {
          ...state.submittedSubjects,
          [state.currentSubject]: true,
        },
      };
    }
    case "GRADES_SAVED":
      return {
        ...state,
        saved: true,
      };

    case "SET_STUDENT_ATTENDANCE": {
      const { id, value } = action.payload;
      return {
        ...state,
        students: state.students.map((student) => {
          if (student.id === id) {
            return {
              ...student,
              attendance: Number(value),
            };
          }
          return student;
        }),
      };
    }

    case "SET_PROMOTED_TO": {
      const { id, value } = action.payload;
      return {
        ...state,
        students: state.students.map((student) => {
          if (student.id === id) {
            return {
              ...student,
              promoted_to: value,
            };
          }
          return student;
        }),
      };
    }

    default:
      return state;
  }
}
export default studentReducer;
