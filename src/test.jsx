case "CALCULATE_PERCENTAGE": {
      const { id, field } = action.payload;
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
            return {
              ...student,
              subjects: {
                ...student.subjects,
                [state.currentSubject]: {
                  ...student.subjects?.[state.currentSubject],
                  subTotal:
                    
                    student.subjects?.[state.currentSubject]?.subTotal ||
                    0,
                  examPercent:
                    field === "examScore"
                      ? (student.subjects?.[state.currentSubject]?.examScore /
                        100) *
                      50 || 0
                      : student.subjects?.[state.currentSubject]?.examPercent ||
                      0,
                  total: () => {
                    const subTotal = titles.reduce((acc, title) => {
                  }
                },
              },
            };
          } else {
            return student;
          }
        }),
      };
    }