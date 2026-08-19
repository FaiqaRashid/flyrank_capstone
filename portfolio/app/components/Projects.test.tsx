import { render, screen, fireEvent } from "@testing-library/react";
import Projects from "@/app/components/Projects";

jest.mock("framer-motion", () => ({
  motion: {
    article: ({ children, onMouseMove, onMouseLeave, ...props }: any) => (
      <article onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} {...props}>
        {children}
      </article>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    a: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  },
  useMotionValue: () => ({ set: jest.fn() }),
  useSpring: () => ({}),
  useTransform: () => "0deg",
  useReducedMotion: () => false,
}));

describe("Projects component", () => {
  test("renders section heading and all 4 featured project titles", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: /03 \/\/ featured projects/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /pakfreelance ai agent/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /anime explorer/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /scriptclean a11y guard/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ai contract & legal document risk analyzer/i })).toBeInTheDocument();
  });

  test("renders live demo and github links for projects", () => {
    render(<Projects />);

    const demoLink = screen.getByRole("link", { name: /live demo for pakfreelance ai agent/i });
    expect(demoLink).toHaveAttribute("href", "https://huggingface.co/spaces/lablab-ai-amd-developer-hackathon/pakfreelance-ai-agent");

    const githubLinks = screen.getAllByText(/github code/i);
    expect(githubLinks.length).toBe(4);
  });

  test("triggers mousemove and mouseleave tilt events on project card", () => {
    render(<Projects />);

    const firstCard = screen.getByRole("heading", { name: /pakfreelance ai agent/i }).closest("article");
    expect(firstCard).toBeInTheDocument();

    if (firstCard) {
      fireEvent.mouseMove(firstCard, { clientX: 100, clientY: 100 });
      fireEvent.mouseLeave(firstCard);
    }
  });
});
