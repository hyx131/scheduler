import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import useApplicationData from "hooks/useApplicationData";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../helpers/selectors";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  // console.log("state: ", state);
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList days={state.days} day={state.day} setDay={setDay} />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appointments.map(appointment => {
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
              interview={getInterview(state, appointment.interview)}
              interviewers={interviewers}
              bookInterview={bookInterview}
              deleteInterview={deleteInterview}
            />
          );
        })}
      </section>
    </main>
  );
}
