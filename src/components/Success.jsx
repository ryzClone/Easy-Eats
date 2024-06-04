import React from "react";
import "../style/Success.css";

import Error from "../icons/error.svg";
import Successful from "../icons/success.svg";

export default function Success(props) {
  return (
    <div className="Success">
      <div className="Success-img">
        <img
          src={props.success === true ? Successful : Error}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="Success-text">{props.title}</div>
    </div>
  );
}
