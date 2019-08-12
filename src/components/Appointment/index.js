import React, { useEffect } from "react";
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

const Appointment = props => {
  const { interview, id, interviewers, bookInterview, deleteInterview } = props;

  const EMPTY = "empty";
  const SHOW = "show";
  const CONFIRM = "confirm";
  const STATUS = "status";
  const ERROR = "error";
  const CREATE = "create";
  const EDIT = "edit";
  const SAVING = "saving";
  const DELETING = "deleting";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // useEffect(() => {
  //   if (props.interview && mode === EMPTY) {
  //     transition(SHOW);
  //   }
  //   if (props.interview === null && mode === SHOW) {
  //     transition(EMPTY);
  //   }
  // }, [props.interview, transition, mode]);

  return (
    <article className="appointment2">
      <Header time={props.time} />
      {mode === "empty" && <Empty onAdd={() => transition(CREATE)} />}
      {mode === "show" && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === "confirm" && (
        <Confirm
          message="Are you sure you want to delete the appointment?"
          onConfirm={() => {
            transition(DELETING);
            deleteInterview(id).then(() => {
              transition(EMPTY);
            });
          }}
          onCancel={props.onCancel}
        />
      )}
      {mode === "status" && <Status message={props.message} />}
      {mode === "saving" && <Status message="Saving" />}
      {mode === "deleting" && <Status message="Deleting" />}
      {mode === "error" && (
        <Error message={props.message} onClose={props.OnClose} />
      )}
      {mode === "create" && (
        <Form
          name={props.name}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            transition(SAVING);
            bookInterview(id, { student: name, interviewer }).then(() =>
              transition(SHOW)
            );
          }}
          onCancel={() => back()}
        />
      )}
      {mode === "edit" && (
        <Form
          name={props.name}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={(name, interviewer) => {
            transition(SAVING);
            bookInterview(id, { student: name, interviewer }).then(() => {
              transition(SHOW);
            });
          }}
          onCancel={props.onCancel}
        />
      )}
    </article>
  );
};

export default Appointment;
