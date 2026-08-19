import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatWindow from "@/app/components/ChatWindow"; // adjust this path to match your project

// --- MOCKS ---
// ChatWindow imports useChat from @ai-sdk/react and useReducedMotion from framer-motion.
// In a real browser these do real work (network calls, checking OS settings).
// In a test, we don't want either — we want full control over what they return,
// so we can simulate "loading", "error", "success" etc. on demand.

// This variable lets each test change what useChat() returns, before rendering.
let mockUseChatReturn: any;

jest.mock("@ai-sdk/react", () => ({
  useChat: () => mockUseChatReturn,
}));

jest.mock("framer-motion", () => ({
  useReducedMotion: () => false,
}));

// A fresh, default fake return value for useChat — used unless a test overrides it.
function createMockChat(overrides = {}) {
  return {
    messages: [],
    input: "",
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn((e) => e.preventDefault()),
    isLoading: false,
    stop: jest.fn(),
    append: jest.fn(),
    error: undefined,
    reload: jest.fn(),
    ...overrides,
  };
}

beforeEach(() => {
  // Reset to a clean default before every single test, so tests don't leak into each other
  mockUseChatReturn = createMockChat();
});

describe("ChatWindow — empty state", () => {
  test("shows the welcome message and suggestion chips when there are no messages", () => {
    render(<ChatWindow />);

    expect(screen.getByText(/Ask Faiqa's AI Assistant!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/What projects has Faiqa built?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/What's Faiqa's tech stack?/i)
    ).toBeInTheDocument();
  });

  test("clicking a suggestion chip calls append with that message", async () => {
    const user = userEvent.setup();
    render(<ChatWindow />);

    const chip = screen.getByText(/What's Faiqa's tech stack?/i);
    await user.click(chip);

    expect(mockUseChatReturn.append).toHaveBeenCalledWith({
      role: "user",
      content: "What's Faiqa's tech stack?",
    });
  });
});

describe("ChatWindow — sending a message", () => {
  test("Send button is disabled when the input is empty", () => {
    render(<ChatWindow />);
    const sendButton = screen.getByRole("button", { name: /send message/i });
    expect(sendButton).toBeDisabled();
  });

  test("typing text and submitting calls handleSubmit", async () => {
    const user = userEvent.setup();
    // Give this render a non-empty input, since ChatWindow reads `input` from useChat
    mockUseChatReturn = createMockChat({ input: "Hello there" });
    render(<ChatWindow />);

    const sendButton = screen.getByRole("button", { name: /send message/i });
    expect(sendButton).not.toBeDisabled();

    await user.click(sendButton);
    expect(mockUseChatReturn.handleSubmit).toHaveBeenCalled();
  });
});

describe("ChatWindow — error and retry", () => {
  test("shows a network error message and a Retry button when the request fails", () => {
    mockUseChatReturn = createMockChat({
      error: new Error("Failed to fetch"),
    });
    render(<ChatWindow />);

    expect(
      screen.getByText(/couldn't reach the server/i)
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).not.toBeDisabled();
  });

  test("shows a distinct message for rate-limit (429) errors", () => {
    mockUseChatReturn = createMockChat({
      error: new Error("429 Too Many Requests"),
    });
    render(<ChatWindow />);

    expect(
      screen.getByText(/too many requests right now/i)
    ).toBeInTheDocument();
  });

  test("clicking Retry calls reload()", async () => {
    const user = userEvent.setup();
    mockUseChatReturn = createMockChat({
      error: new Error("Failed to fetch"),
    });
    render(<ChatWindow />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    await user.click(retryButton);

    expect(mockUseChatReturn.reload).toHaveBeenCalledTimes(1);
  });

  test("Retry button is disabled while a retry is loading", () => {
    mockUseChatReturn = createMockChat({
      error: new Error("Failed to fetch"),
      isLoading: true,
    });
    render(<ChatWindow />);

    const retryButton = screen.getByRole("button", { name: /retrying/i });
    expect(retryButton).toBeDisabled();
  });
});

describe("ChatWindow — empty input validation", () => {
  test("shows a warning if the form is submitted with only whitespace", () => {
    mockUseChatReturn = createMockChat({ input: "   " });
    render(<ChatWindow />);

    // The Send button is disabled for whitespace-only input via `!input.trim()`,
    // so we submit the form directly to exercise handleFormSubmit's own guard.
    const form = screen.getByRole("button", { name: /send message/i }).closest("form")!;
    fireEvent.submit(form);

    expect(
      screen.getByText(/please enter a message before sending/i)
    ).toBeInTheDocument();
    expect(mockUseChatReturn.handleSubmit).not.toHaveBeenCalled();
  });
});
