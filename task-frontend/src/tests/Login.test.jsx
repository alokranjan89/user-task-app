import { render, screen } from "@testing-library/react";
import Login from "../src/pages/Login";

test("renders login page", () => {

  render(<Login />);

  expect(screen.getByText("Login")).toBeInTheDocument();

});