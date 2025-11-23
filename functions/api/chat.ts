import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAnthropic } from "@ai-sdk/anthropic";

const SYSTEM_PROMPT = `You are Synapse, a helpful AI assistant that supports conversation branching and exploration.`;

const createChatModel = (
  provider: string,
  apiKey: string,
  model: string,
  customUrl?: string,
) => {
  switch (provider) {
    case "openrouter": {
      const openrouter = createOpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey,
      });
      return openrouter(model);
    }
    case "google": {
      const google = createGoogleGenerativeAI({
        apiKey,
      });
      return google(model || "gemini-2.0-flash-exp");
    }
    case "groq": {
      const groq = createOpenAI({
        baseURL: "https://api.groq.com/openai/v1",
        apiKey,
      });
      return groq(model || "llama-3.3-70b-versatile");
    }
    case "anthropic": {
      const anthropic = createAnthropic({
        apiKey,
      });
      return anthropic(model || "claude-3-5-sonnet-20241022");
    }
    case "xai": {
      const xai = createOpenAI({
        baseURL: "https://api.x.ai/v1",
        apiKey,
      });
      return xai(model || "grok-beta");
    }
    case "custom": {
      if (!customUrl) throw new Error("Custom URL required");
      const custom = createOpenAI({
        baseURL: customUrl,
        apiKey,
      });
      return custom(model);
    }
    case "openai":
    default: {
      const openai = createOpenAI({ apiKey });
      return openai(model || "gpt-4o-mini");
    }
  }
};

export const onRequest = async ({ request }: { request: Request }) => {
  try {
    const body = await request.json();
    const { messages, provider, apiKey, model, customUrl } = body;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const chatModel = createChatModel(provider, apiKey, model, customUrl);

    // Stream from the model
    const result = streamText({
      model: chatModel,
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
    });

    // Return the stream
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
