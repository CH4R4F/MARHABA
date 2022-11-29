import { render, screen, cleanup } from "@testing-library/react";
import ProfileCard from "../profileCard";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("renders profile card", () => {
  const user = {
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    image: "default.png",
  };
  render(<ProfileCard user={user} />);
  const linkElement = screen.getByText(/John Doe/i);
  expect(linkElement).toBeInTheDocument();
});
