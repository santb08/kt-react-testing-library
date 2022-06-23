import React, { Component } from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { fireEvent, getQueriesForElement } from "@testing-library/dom";
import { render } from "@testing-library/react";

test("Assertions with react dom", () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);

  expect(root.querySelector("h1").textContent).toBe("TODOS");
  expect(root.querySelector("label").textContent).toBe(
    "What needs to be done?"
  );
  expect(root.querySelector("button").textContent).toBe("Add todo");
});

test("Assertions with react testing library", () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);

  const { getByText, getByLabelText } = getQueriesForElement(root);

  expect(getByText("TODOS")).not.toBeNull();
  expect(getByLabelText("What needs to be done?")).not.toBeNull();
  expect(getByText("Add todo")).not.toBeNull();
});

/**
 * byLabelText, byRole, byTestId
 */
test("Assertions utitlies", async () => {
  const { container, getByText, getAllByTestId } = render(<App />);

  // You can go deeped and deeper in the React DOM using
  // POO in a very declarative way for iterating the three
  expect(container.firstChild.firstChild.textContent).toBe("TODOS");

  // You can assert by different attributes for testing
  const title1 = getByText(/todos/i);
  expect(title1).toBeTruthy();
  // await screen.findByText(container, /todos/i); // Throws error

  // You can call operations over "title1" too, like this
  // expect(title1).toBe('<h1>TODOS</h1>');

  // Get by attr data-testid
  const [title2] = getAllByTestId("titleId");
  expect(title2.textContent).toBe("TODOS");

  // Custom query? No problem
  // Let's look for our button node
  // That has an attr with [name="Andres"]
  const button = container.querySelector('[name="Andres"]');
  expect(button).toBeTruthy();
});

test("Firing events", () => {
  const onClick = jest.fn();
  const { getByText } = render(<App onClick={onClick} />);

  const button = getByText(/add/gi);

  const eventOptions = {};

  expect(button.textContent).toBeTruthy();
  fireEvent.click(button, eventOptions);

  expect(onClick).toBeCalled();
});
