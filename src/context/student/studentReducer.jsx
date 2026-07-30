//  Initial global state
export const initialState = {
  students: [],
  currentSubject: "Mathematics",
  subjects: [
    "Mathematics",
    "Integrated Science",
    "Social Studies",
    "Creative Arts",
    "Twi",
    "French",
    "Religious & Moral Education",
    "Computing",
    "English Language",
    "Career Technology",
    "History",
  ],
  name: "",
  saved: false,
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

    case "CLEAR_STUDENTS": {
      return {
        ...state,
        students: [],
        saved: false,
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

      const scores = {
        projectWork: 20,
        classWork: 40,
        classTestOne: 10,
        classTestTwo: 10,
        HomeWork: 20,
        examScore: 100,
      };

      return {
        ...state,
        students: state.students.map((student) => {
          if (student.id === id) {
            const currentSubject =
              student.subjects?.[state.currentSubject] || {};

            // getting field score
            const field_score = scores[field];

            // Update the edited field
            const updatedSubject = {
              ...currentSubject,
              [field]: Number(value) <= field_score ? Number(value) : 0,
            };
            // Calculate the total score for the subject
            const totalB = titles.reduce((sum, key) => {
              return sum + Number(updatedSubject[key] || 0);
            }, 0);
            //  percentage 50%
            const classPercent = Math.round((totalB / 100) * 50);

            // Exam percentage 50%
            const examPercent = Math.round(
              (Number(updatedSubject.examScore || 0) / 100) * 50,
            );

            return {
              ...student,
              subjects: {
                ...student.subjects,
                [state.currentSubject]: {
                  ...updatedSubject,
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

    case "SET_BEHAVIOUR":
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id
            ? {
                ...student,
                behaviour: {
                  ...student.behaviour,
                  [action.payload.field]: action.payload.value,
                },
              }
            : student,
        ),
      };

    default:
      return state;
  }
}
export default studentReducer;
