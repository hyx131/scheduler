import React from "react";
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
  const { id, bookInterview, deleteInterview } = props;

  const EMPTY = "empty";
  const SHOW = "show";
  const CONFIRM = "confirm";
  const STATUS = "status";
  const ERROR_SAVE = "error_save";
  const ERROR_DELETE = "error_delete";
  const CREATE = "create";
  const EDIT = "edit";
  const SAVING = "saving";
  const DELETING = "deleting";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log("pppppppppppppp", props);

  return (
    <article className="appointment2">
      <Header time={props.time} />
      {mode === "empty" && <Empty onAdd={() => transition(CREATE)} />}
      {mode === "show" && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === "confirm" && (
        <Confirm
          message="Are you sure you want to delete the appointment?"
          onConfirm={() => {
            transition(DELETING);
            deleteInterview(id)
              .then(() => {
                transition(EMPTY);
              })
              .catch(error => transition(ERROR_DELETE, true));
          }}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === "status" && <Status message={props.message} />}
      {mode === "saving" && <Status message="Saving" />}
      {mode === "deleting" && <Status message="Deleting" />}
      {mode === "error" && (
        <Error message={props.message} onClose={props.OnClose} />
      )}
      {mode === "error_save" && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )}
      {mode === "error_delete" && (
        <Error message="Could not delete appointment." onClose={() => back()} />
      )}
      {mode === "create" && (
        <Form
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            transition(SAVING);
            bookInterview(id, { student: name, interviewer })
              .then(() => transition(SHOW))
              .catch(error => transition(ERROR_SAVE, true));
          }}
          onCancel={() => back()}
        />
      )}
      {mode === "edit" && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={(name, interviewer) => {
            transition(SAVING);
            bookInterview(id, { student: name, interviewer })
              .then(() => {
                transition(SHOW);
              })
              .catch(error => transition(ERROR_SAVE, true));
          }}
          onCancel={() => back()}
        />
      )}
    </article>
  );
};

export default Appointment;
