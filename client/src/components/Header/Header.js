import React from "react";
import "./Header.css";

const Header = ({ children }) => (
  <div className="header">
    <h1>{children}</h1>
  </div>
);
export default Header;
