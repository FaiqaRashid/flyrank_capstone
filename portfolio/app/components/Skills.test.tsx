import { render, screen } from "@testing-library/react";
import Skills from "@/app/components/Skills";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useReducedMotion: () => false,
}));

describe("Skills component", () => {
  test("renders section heading and skill categories", () => {
    render(<Skills />);

    expect(screen.getByRole("heading", { name: /02 \/\/ technical skills/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^frontend$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^ai \/ nlp$/i })).toBeInTheDocument();
    expect(screen.getByText("Gemini API")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });
});
