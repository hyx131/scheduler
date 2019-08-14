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

  // const foundDay = state.days.filter(d => d.name === day)[0];
  // if (!foundDay) {
  //   return [];
  // }
  // return foundDay.appointmnets.map(id=> state.appointments[id]);

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
