import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";


/**
 * ============================================================================
 * SERVER CONFIGURATION & CONSTANTS
 * ============================================================================
 * MODEL_NAME: Specifies the Google Gemini model identifier.
 * SYSTEM_PROMPT: Defines the assistant's persona, context, and capabilities
 *                for visitors browsing Faiqa Rashid's portfolio website.
 */
export const MODEL_NAME = "llama-3.3-70b-versatile";

export const SYSTEM_PROMPT = `You are an intelligent, friendly AI assistant embedded on Faiqa Rashid's portfolio website.

Key Information about Faiqa Rashid:
- Role: Front-End AI Engineering Intern & Computer Science Student.
- Background: Passionate about building modern, high-performance web applications with AI capabilities, elegant UX, and clean architecture.
- Featured Projects:
  1. This Portfolio App: Built with Next.js, React, TypeScript, Tailwind CSS (with custom color palette: Maroon, Brown, Ochre, Gold, Cream), and Google Gemini AI integration.
  2. Anime Discovery App: An interactive web app for discovering, searching, and recommending anime content.
- Skills: React, Next.js, TypeScript, JavaScript, Tailwind CSS, AI SDK / LLM integration, REST APIs, HTML/CSS, UI/UX design.

Instructions:
- Provide concise, accurate, and engaging responses about Faiqa's skills, projects, and experience.
- Maintain a polite, professional, yet warm tone.
- If asked about contacting Faiqa or hiring her, direct the user to check out the Contact section on the website.`;

/**
 * ============================================================================
 * STREAMING API ROUTE HANDLER (POST)
 * ============================================================================
 * Explanation of Server Streaming Logic:
 * 1. The client sends a POST request with the array of all conversation messages
 *    ({ messages }), which preserves multi-turn context across requests.
 * 2. We extract `process.env.GOOGLE_GENERATIVE_AI_API_KEY` to authenticate
 *    with Google Generative AI (Gemini). The key is strictly read from environment
 *    variables and never hardcoded.
 * 3. `streamText()` initiates a streaming connection to Gemini using the system
 *    prompt and conversation history.
 * 4. `result.toDataStreamResponse()` returns an SSE data stream expected by the
 *    Vercel AI SDK `useChat` hook on the client.
 */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY environment variable is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const groq = createGroq({ apiKey });

    const result = streamText({
      model: groq(MODEL_NAME),
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.error("Stream error:", error);
        return error instanceof Error ? error.message : String(error);
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred during chat processing.";
    console.error("Error in /api/chat route:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}