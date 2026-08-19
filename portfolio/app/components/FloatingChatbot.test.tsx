import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingChatbot from "@/app/components/FloatingChatbot"; // adjust path to match your project

// --- MOCKS ---

// We already tested ChatWindow.tsx in its own file. Here we don't care what's
// INSIDE the chat window — we only care whether FloatingChatbot shows/hides it
// correctly. So we replace ChatWindow with a tiny stand-in component.
// This also avoids needing to mock useChat again in this file.
jest.mock("./ChatWindow", () => {
  return function MockChatWindow({ onClose }: { onClose?: () => void }) {
    return (
      <div data-testid="mock-chat-window">
        Mock Chat Window
        <button onClick={onClose}>Mock Close</button>
      </div>
    );
  };
});

// framer-motion's real animations use browser timing APIs that don't behave
// well in jsdom, and we don't need to test animation itself — just that
// content shows/hides. We replace motion.button/motion.div with plain
// html elements, and AnimatePresence with a simple passthrough.
jest.mock("framer-motion", () => ({
  motion: {
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

describe("FloatingChatbot — open and close", () => {
  test("chat window is not shown initially", () => {
    render(<FloatingChatbot />);
    expect(screen.queryByTestId("mock-chat-window")).not.toBeInTheDocument();
  });

  test("launcher button has the correct initial accessible label", () => {
    render(<FloatingChatbot />);
    expect(
      screen.getByRole("button", { name: /open ai chat assistant/i })
    ).toBeInTheDocument();
  });

  test("clicking the launcher button opens the chat window", async () => {
    const user = userEvent.setup();
    render(<FloatingChatbot />);

    const launcher = screen.getByRole("button", {
      name: /open ai chat assistant/i,
    });
    await user.click(launcher);

    expect(screen.getByTestId("mock-chat-window")).toBeInTheDocument();
    // The label should now flip to "Close", since the button also acts as the close control
    expect(
      screen.getByRole("button", { name: /close ai chat assistant/i })
    ).toBeInTheDocument();
  });

  test("clicking the launcher again closes the chat window", async () => {
    const user = userEvent.setup();
    render(<FloatingChatbot />);

    const launcher = screen.getByRole("button", {
      name: /open ai chat assistant/i,
    });
    await user.click(launcher); // open
    await user.click(
      screen.getByRole("button", { name: /close ai chat assistant/i })
    ); // close

    expect(screen.queryByTestId("mock-chat-window")).not.toBeInTheDocument();
  });

  test("ChatWindow's own close button also closes the widget", async () => {
    const user = userEvent.setup();
    render(<FloatingChatbot />);

    await user.click(
      screen.getByRole("button", { name: /open ai chat assistant/i })
    );
    expect(screen.getByTestId("mock-chat-window")).toBeInTheDocument();

    // This is the "Mock Close" button inside our fake ChatWindow, wired to onClose
    await user.click(screen.getByText("Mock Close"));

    expect(screen.queryByTestId("mock-chat-window")).not.toBeInTheDocument();
  });
});

describe("FloatingChatbot — keyboard behavior", () => {
  test("pressing Escape closes the chat window when it's open", async () => {
    const user = userEvent.setup();
    render(<FloatingChatbot />);

    await user.click(
      screen.getByRole("button", { name: /open ai chat assistant/i })
    );
    expect(screen.getByTestId("mock-chat-window")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByTestId("mock-chat-window")).not.toBeInTheDocument();
  });

  test("pressing Escape does nothing when the chat window is already closed", () => {
    render(<FloatingChatbot />);

    // Should not throw or change anything
    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByTestId("mock-chat-window")).not.toBeInTheDocument();
  });

  test("focus returns to the launcher button after closing with Escape", async () => {
    const user = userEvent.setup();
    render(<FloatingChatbot />);

    const launcher = screen.getByRole("button", {
      name: /open ai chat assistant/i,
    });
    await user.click(launcher);

    fireEvent.keyDown(window, { key: "Escape" });

    // After closing, the (same physical) button should regain keyboard focus,
    // which matters for screen-reader and keyboard-only users.
    const closedLauncher = screen.getByRole("button", {
      name: /open ai chat assistant/i,
    });
    expect(closedLauncher).toHaveFocus();
  });
});

describe("FloatingChatbot — dialog semantics", () => {
  test("the open chat drawer has role='dialog' with an accessible label", async () => {
    const user = userEvent.setup();
    render(<FloatingChatbot />);

    await user.click(
      screen.getByRole("button", { name: /open ai chat assistant/i })
    );

    expect(
      screen.getByRole("dialog", { name: /ai chat assistant drawer/i })
    ).toBeInTheDocument();
  });
});
