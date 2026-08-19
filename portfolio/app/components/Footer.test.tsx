import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "@/app/components/Footer";

jest.mock("framer-motion", () => ({
  motion: {
    a: ({ children, onClick, href, ...props }: any) => (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    ),
  },
  useReducedMotion: () => false,
}));

describe("Footer component", () => {
  test("renders copyright text and social links", () => {
    render(<Footer />);
    expect(screen.getByText(/Faiqa Rashid\. All rights reserved\./i)).toBeInTheDocument();

    const githubLink = screen.getByRole("link", { name: /faiqa rashid github profile/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/FaiqaRashid/FaiqaRashid");

    const linkedinLink = screen.getByRole("link", { name: /faiqa rashid linkedin profile/i });
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/faiqarashid/");
  });

  test("clicking Back to top link triggers window.scrollTo", async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const backToTop = screen.getByText(/back to top ↑/i);
    await user.click(backToTop);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
