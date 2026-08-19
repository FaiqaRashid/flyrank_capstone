import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/app/components/Navbar";

jest.mock("framer-motion", () => ({
  motion: {
    a: ({ children, onClick, href, ...props }: any) => (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    ),
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useReducedMotion: () => false,
}));

describe("Navbar component", () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  test("renders brand logo and navigation items", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: /faiqa rashid home/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^about$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^projects$/i })).toBeInTheDocument();
  });

  test("toggles mobile menu dropdown when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const menuToggle = screen.getByRole("button", { name: /open navigation menu/i });
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");

    await user.click(menuToggle);

    expect(menuToggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();

    await user.click(menuToggle);
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");
  });

  test("clicking nav link calls scrollIntoView when section element exists", async () => {
    const user = userEvent.setup();
    const section = document.createElement("section");
    section.id = "projects";
    document.body.appendChild(section);

    render(<Navbar />);

    const projectsLink = screen.getByRole("link", { name: /^projects$/i });
    await user.click(projectsLink);

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(section);
  });
});
