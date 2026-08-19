import { POST } from "./route";

jest.mock("@ai-sdk/groq", () => ({
  createGroq: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("ai", () => ({
  streamText: jest.fn().mockReturnValue({
    toDataStreamResponse: jest.fn().mockImplementation(() => ({
      status: 200,
      text: async () => "stream-ok",
      json: async () => ({ status: "ok" }),
    })),
  }),
}));

describe("/api/chat POST route handler", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("returns 500 error when GROQ_API_KEY is missing", async () => {
    delete process.env.GROQ_API_KEY;

    const req = {
      json: async () => ({ messages: [{ role: "user", content: "Hello" }] }),
    } as any;

    const response = await POST(req);
    expect(response.status).toBe(500);

    const json = await response.json();
    expect(json.error).toBe("GROQ_API_KEY environment variable is not configured.");
  });

  test("returns data stream response when GROQ_API_KEY is present", async () => {
    process.env.GROQ_API_KEY = "mock-groq-key";

    const req = {
      json: async () => ({ messages: [{ role: "user", content: "Hello" }] }),
    } as any;

    const response = await POST(req);
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toBe("stream-ok");
  });

  test("catches request parse errors and returns 500 status", async () => {
    process.env.GROQ_API_KEY = "mock-groq-key";

    const req = {
      json: async () => {
        throw new Error("Invalid JSON");
      },
    } as any;

    const response = await POST(req);
    expect(response.status).toBe(500);
  });
});
