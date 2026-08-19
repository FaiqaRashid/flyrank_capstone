import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingChatbot from "@/app/components/FloatingChatbot";

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
