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

export default getAppointmentsForDay;
