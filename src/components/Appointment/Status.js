import React from "react";

const Status = props => {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        class="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 class="text--semi-bold">{props.message}</h1>
    </main>
  );
};

export default Status;
