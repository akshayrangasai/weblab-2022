import React from "react";
import StreamSelect from "../modules/StreamSelect.js";

const LinkAccount = () => {
  return (
      <div>
      <h1 className="InfoMessage">Welcome! Please Link your Account to Continue</h1>
      <StreamSelect className = "Widget"/>
      </div>
  );
};
export default LinkAccount;
