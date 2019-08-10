import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const DayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <div className={DayListItemClass} onClick={() => props.setDay(props.name)}>
      <h1>{props.name}</h1>
      {props.spots === 0 ? "no" : props.spots} spot
      {props.spots === 1 ? "" : "s"} remaining
    </div>
  );
}