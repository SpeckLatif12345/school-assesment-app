export const initialState = {
  selectedClass: "",
  class_names: [
    "CLASS ONE",
    "CLASS TWO",
    "CLASS THREE",
    "CLASS FOUR",
    "CLASS FIVE",
    "CLASS SIX",
    "JHS ONE",
    "JHS TWO",
    "JHS THREE",
  ],
  totalAttendance: "",
  isFullscreen: false,
  hasImported: false,
};

export function appReducer(state, action) {
  switch (action.type) {
    case "SET_CLASS":
      return {
        ...state,
        selectedClass: action.payload,
      };

    case "CLEAR_CLASS":
      return {
        ...state,
        selectedClass: "",
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

    case "TOGGLE_FULLSCREEN":
      return {
        ...state,
        isFullscreen: !state.isFullscreen,
      };

    case "SET_IMPORT_STATUS":
      return {
        ...state,
        hasImported: action.payload,
      };

    default:
      return state;
  }
}
