import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/app/components/Contact";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
    button: ({ children, onClick, type, disabled, ...props }: any) => (
      <button type={type} disabled={disabled} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  useReducedMotion: () => false,
}));

describe("Contact component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders section heading and form input fields", () => {
    render(<Contact />);

    expect(screen.getByRole("heading", { name: /04 \/\/ get in touch/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message 🚀/i })).toBeInTheDocument();
  });

  test("shows warning message when submitting empty form", () => {
    const { container } = render(<Contact />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();

    if (form) {
      fireEvent.submit(form);
    }

    expect(screen.getByText(/please fill in all required fields before submitting/i)).toBeInTheDocument();
  });

  test("shows error message when submitting email missing dot domain", () => {
    const { container } = render(<Contact />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: "alice@domain" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Hello there" } });

    const form = container.querySelector("form");
    if (form) {
      fireEvent.submit(form);
    }

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test("submits form successfully and displays success message", () => {
    const { container } = render(<Contact />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Interested in collaborating!" } });

    const form = container.querySelector("form");
    if (form) {
      fireEvent.submit(form);
    }

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/message received!/i)).toBeInTheDocument();
  });
});
