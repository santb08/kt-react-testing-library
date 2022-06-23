import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { getQueriesForElement } from "@testing-library/dom";

const render = (component) => {
  const root = document.createElement("div");
  ReactDOM.render(component, root);
  return getQueriesForElement(root);
};

test("Assertions with shorthand", () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);

  const { getByText, getByLabelText } = getQueriesForElement(root);

  getByText("TODOS");
  getByLabelText("What needs to be done?");
  getByText("Add todo");
});

test("Using render", () => {
  const { getByText, getByLabelText } = render(<App />);

  getByText("TODOS");
  getByLabelText("What needs to be done?");
  getByText("Add todo");
});
