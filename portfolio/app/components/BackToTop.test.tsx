import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackToTop from "@/app/components/BackToTop";

describe("BackToTop component", () => {
  test("is hidden initially when scrollY is 0", () => {
    render(<BackToTop />);
    expect(screen.queryByRole("button", { name: /back to top/i })).not.toBeInTheDocument();
  });

  test("shows button when window scrollY > 350", () => {
    render(<BackToTop />);
    window.scrollY = 400;
    fireEvent.scroll(window);

    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  test("clicking button calls window.scrollTo", async () => {
    const user = userEvent.setup();
    render(<BackToTop />);
    window.scrollY = 400;
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /back to top/i });
    await user.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
