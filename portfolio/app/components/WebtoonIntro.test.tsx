import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WebtoonIntro from "@/app/components/WebtoonIntro";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    button: ({ children, onClick, onKeyDown, ...props }: any) => (
      <button onClick={onClick} onKeyDown={onKeyDown} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

describe("WebtoonIntro component", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders intro overlay when sessionStorage flag is not set", () => {
    render(<WebtoonIntro />);

    expect(screen.getByRole("dialog", { name: /torn paper portfolio intro/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /skip torn paper intro and enter portfolio/i })).toBeInTheDocument();
  });

  test("does not render intro overlay when portfolio_intro_seen is already set", () => {
    sessionStorage.setItem("portfolio_intro_seen", "true");
    render(<WebtoonIntro />);

    expect(screen.queryByRole("dialog", { name: /torn paper portfolio intro/i })).not.toBeInTheDocument();
  });

  test("clicking Skip Intro sets sessionStorage flag and hides overlay", async () => {
    render(<WebtoonIntro />);

    const skipBtn = screen.getByRole("button", { name: /skip torn paper intro and enter portfolio/i });
    fireEvent.click(skipBtn);

    expect(sessionStorage.getItem("portfolio_intro_seen")).toBe("true");
    expect(screen.queryByRole("dialog", { name: /torn paper portfolio intro/i })).not.toBeInTheDocument();
  });

  test("pressing Enter key on Skip Intro button triggers skip", () => {
    render(<WebtoonIntro />);

    const skipBtn = screen.getByRole("button", { name: /skip torn paper intro and enter portfolio/i });
    fireEvent.keyDown(skipBtn, { key: "Enter" });

    expect(sessionStorage.getItem("portfolio_intro_seen")).toBe("true");
  });

  test("automatically completes intro and sets sessionStorage after timers elapse", () => {
    render(<WebtoonIntro />);

    act(() => {
      jest.advanceTimersByTime(3500);
    });

    expect(sessionStorage.getItem("portfolio_intro_seen")).toBe("true");
  });
});
