import { render } from "@testing-library/react";
import { Text } from "./";

test("text exists", () => {
    const { getByRole } = render(<Text text="text" />);
    expect(getByRole("text")).toBeInTheDocument();
});

test("text contains text", () => {
    const { getByRole } = render(<Text text="text" />);
    expect(getByRole("text")).toContainHTML("text");
});