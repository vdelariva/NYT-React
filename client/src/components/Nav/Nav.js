import React from "react";

const Nav = props => (
  <nav className="navbar navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      {props.brand}
    </a>
    <span className="text-white">
      {props.children}
    </span>
  </nav>
);

export default Nav;
