export const initialState = {
  selectedClass: localStorage.getItem("selectedClass") || null,
  sign_in: localStorage.getItem("sign-in") === "true",
  questions: [],
  grades: [],
  subjects: ["Mathematics", "English", "Science"],
  class_names: [
    "CLASS ONE",
    "CLASS TWO",
    "CLASS THREE",
    "CLASS FOUR",
    "CLASS FIVE",
    "CLASS SIX",
    "JSS ONE",
    "JSS TWO",
    "JSS THREE",
  ],
  totalAttendance: 0,
};

export function appReducer(state, action) {
  switch (action.type) {
    case "SET_CLASS":
      localStorage.setItem("selectedClass", action.payload);
      localStorage.setItem("sign-in", "true");

      return {
        ...state,
        selectedClass: action.payload,
        sign_in: true,
      };

    case "CLEAR_CLASS":
      localStorage.removeItem("selectedClass");
      localStorage.removeItem("sign-in");
      return {
        ...state,
        selectedClass: null,
      };

    case "FETCH_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };

    case "SET_TOTAL_ATTENDANCE":
      return {
        ...state,
        totalAttendance: action.payload,
      };

    case "CLEAR_TOTAL_ATTENDANCE":
      return {
        ...state,
        totalAttendance: 0,
      };

    default:
      return state;
  }
}
