import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GlobalError from "@/app/error";

describe("GlobalError boundary component", () => {
  test("renders error heading, message, and action buttons", () => {
    const mockError = new Error("Test boundary failure message");
    const mockReset = jest.fn();

    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByRole("heading", { name: /something went wrong/i })).toBeInTheDocument();
    expect(screen.getByText("Test boundary failure message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again ↻/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return home 🏠/i })).toBeInTheDocument();
  });

  test("clicking Try Again calls reset handler", async () => {
    const user = userEvent.setup();
    const mockError = new Error("Test failure");
    const mockReset = jest.fn();

    render(<GlobalError error={mockError} reset={mockReset} />);

    const retryBtn = screen.getByRole("button", { name: /try again ↻/i });
    await user.click(retryBtn);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
