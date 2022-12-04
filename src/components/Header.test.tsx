import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./";

test("header exists", () => {
    const { getByRole } = render(<BrowserRouter><Header /></BrowserRouter>);
    expect(getByRole("header")).toBeInTheDocument();
});

test("logo exists", () => {
    const { getByRole } = render(<BrowserRouter><Header /></BrowserRouter>);
    expect(getByRole("logo")).toBeInTheDocument();
});

test("button exists", () => {
    const { getByRole } = render(<BrowserRouter><Header /></BrowserRouter>);
    expect(getByRole("button")).toBeInTheDocument();
});

test("button is link to lottery", () => {
    const { getByRole } = render(<BrowserRouter><Header /></BrowserRouter>);
    expect(getByRole("button")).toHaveAttribute("href", "/lottery");
});

test("button is primary", () => {
    const { getByRole } = render(<BrowserRouter><Header /></BrowserRouter>);
    expect(getByRole("button")).toHaveStyle("border: solid 1px #ff0;");
});