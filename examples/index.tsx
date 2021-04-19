import React from "react";
import ReactDOM from "react-dom";
import Example from "./ScrollLazyLoadExample";

const Root = () => {
  return <Example />;
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
