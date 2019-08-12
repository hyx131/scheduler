export function getInterviewersForDay(state, day) {
  const days = state.days;
  const appointment = [];

  days.forEach(date => {
    if (!date.name) {
      return [];
    } else {
      if (date.name === day) {
        date.interviewers.forEach(id => {
          appointment.push(state.interviewers[id]);
        });
      }
    }
  });

  return appointment;
}

export function getAppointmentsForDay(state, day) {
  const days = state.days;
  const appointment = [];

  days.forEach(date => {
    if (!date.name) {
      return [];
    } else {
      if (date.name === day) {
        date.appointments.forEach(id => {
          appointment.push(state.appointments[id]);
        });
      }
    }
  });

  return appointment;
}

export const getInterview = (state, interview) => {
  return !interview
    ? null
    : {
        student: interview.student,
        interviewer: { ...state.interviewers[interview.interviewer] }
      };
};

// export function getInterviewersForDay(state, day) {
//   const interviewers = [];
//   const arrAppointments = getAppointmentsForDay(state, day);

//   arrAppointments.forEach(appointment => {
//     if (appointment.interview) {
//       let interviewerId = appointment.interview.interviewer;
//       interviewers.push(state.interviewers[interviewerId]);
//     }
//   });

//   return interviewers;
// }

export default getAppointmentsForDay;
