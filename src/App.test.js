/* eslint-disable */
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders beetz", () => {
  render(<App />);
  const linkElement = screen.getByText(/beetz/i);
  expect(linkElement).toBeInTheDocument();
});
