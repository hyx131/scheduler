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
  const EMPTY = "empty";
  const SHOW = "show";
  const CONDIRM = "confirm";
  const STATUS = "status";
  const ERROR = "error";
  const CREATE = "create";
  const EDIT = "edit";

  const { mode, transition, back } = useVisualMode(EMPTY);

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
      {mode === "show" && !props.interview && <Empty onAdd={props.onAdd} />}
      {mode === "show" && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}
      {mode === "confirm" && (
        <Confirm
          message={props.message}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        />
      )}
      {mode === "status" && <Status message={props.message} />}
      {mode === "error" && (
        <Error message={props.message} onClose={props.OnClose} />
      )}
      {mode === "create" && (
        <Form
          name={props.name}
          interviewers={[]}
          onSave={(name, interviewer) => {
            return {
              name: name,
              interviewer: interviewer
            };
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
            return {
              name: name,
              interviewer: interviewer
            };
          }}
          onCancel={props.onCancel}
        />
      )}
    </article>
  );
};

export default Appointment;
