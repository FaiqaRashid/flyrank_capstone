import { render, screen } from "@testing-library/react";
import ChatPage from "@/app/chat/page";

jest.mock("../components/ChatWindow", () => {
  return function MockChatWindow() {
    return <div data-testid="mock-chat-window">Mock Chat Window</div>;
  };
});

describe("ChatPage component", () => {
  test("renders header title and MockChatWindow", () => {
    render(<ChatPage />);

    expect(screen.getByRole("heading", { name: /ai assistant/i })).toBeInTheDocument();
    expect(screen.getByTestId("mock-chat-window")).toBeInTheDocument();
  });
});
