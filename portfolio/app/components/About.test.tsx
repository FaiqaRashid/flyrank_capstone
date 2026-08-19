import { render, screen } from "@testing-library/react";
import About from "@/app/components/About";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}));

describe("About component", () => {
  test("renders section heading and philosophy cards", () => {
    render(<About />);

    expect(screen.getByRole("heading", { name: /01 \/\/ about me/i })).toBeInTheDocument();
    expect(screen.getByText(/philosophy & mindset/i)).toBeInTheDocument();
    expect(screen.getByText("BUILD")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Apps")).toBeInTheDocument();
    expect(screen.getByText("BREAK")).toBeInTheDocument();
    expect(screen.getByText("FIX")).toBeInTheDocument();
  });
});
