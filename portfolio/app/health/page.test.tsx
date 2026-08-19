import { render, screen } from "@testing-library/react";
import HealthCheck from "@/app/health/page";

describe("HealthCheck server page", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("renders OK status when fetch succeeds", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      }),
    });

    const jsx = await HealthCheck();
    render(jsx);

    expect(screen.getByRole("heading", { name: /health check/i })).toBeInTheDocument();
    expect(screen.getByText("● OK")).toBeInTheDocument();
    expect(screen.getByText(/delectus aut autem/i)).toBeInTheDocument();
  });

  test("renders ERROR status when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const jsx = await HealthCheck();
    render(jsx);

    expect(screen.getByText("● ERROR")).toBeInTheDocument();
    expect(screen.getByText(/Error: HTTP error! status: 500/i)).toBeInTheDocument();
  });
});
