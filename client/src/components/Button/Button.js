import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Button = props => (
  <span className={props.className} style={props.style} {...props}>
    {props.children}
  </span>
);

export default Button;
