import React from "react";
import { getByRole, render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";

test("renders header", () => {
  const { getByRole } = render(<App />);
  expect(getByRole("header")).toBeInTheDocument();
});
