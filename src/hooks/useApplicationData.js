import { useEffect, useReducer } from "react";
import axios from "axios";

const useApplicationData = props => {
  const SET_INTERVIEW = "SET_ITNERVIEW";
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";

  const reducer = (state, action) => {
    const {
      appointments,
      day,
      days,
      id,
      interview,
      interviewers,
      type
    } = action;

    switch (type) {
      case SET_DAY:
        return { ...state, day };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        return { ...state, appointments };
      }
      case SET_APPLICATION_DATA:
        return { ...state, days, appointments, interviewers };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const bookInterview = (id, interview) => {
    return axios
      .put(`http://localhost:3001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  const deleteInterview = id => {
    return axios
      .delete(`http://localhost:3001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  };

  const setDay = day => dispatch({ type: SET_DAY, day: day });
  const setApplicationData = (days, appointments, interviewers) =>
    dispatch({
      type: SET_APPLICATION_DATA,
      days: days,
      appointments: appointments,
      interviewers: interviewers
    });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/days"),
      axios.get("http://localhost:3001/api/appointments"),
      axios.get("http://localhost:3001/api/interviewers")
    ]).then(all => {
      setApplicationData(all[0].data, all[1].data, all[2].data);
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };
};

export default useApplicationData;
