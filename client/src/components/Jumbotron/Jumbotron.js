import React from "react";
import "./Jumbotron.css";

const Jumbotron = props => (
  <div className="jumbotron">
    <h4>{props.text}</h4>
  </div>
);

export default Jumbotron;
