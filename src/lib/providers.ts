export interface Provider {
	id: string;
	name: string;
	apiKeyUrl: string;
	requiresCustomUrl?: boolean;
}

export const providers: Provider[] = [
	{
		id: "openai",
		name: "OpenAI",
		apiKeyUrl: "https://platform.openai.com/api-keys",
	},
	{
		id: "openrouter",
		name: "OpenRouter",
		apiKeyUrl: "https://openrouter.ai/keys",
	},
	{
		id: "google",
		name: "Google Gemini",
		apiKeyUrl: "https://aistudio.google.com/app/api-keys",
	},
	{
		id: "anthropic",
		name: "Anthropic (Claude)",
		apiKeyUrl: "https://console.anthropic.com/settings/keys",
	},
	{
		id: "xai",
		name: "xAI (Grok)",
		apiKeyUrl: "https://console.x.ai/",
	},
	{
		id: "groq",
		name: "Groq",
		apiKeyUrl: "https://console.groq.com/keys",
	},
	{
		id: "custom",
		name: "Custom (OpenAI-compatible)",
		apiKeyUrl: "",
		requiresCustomUrl: true,
	},
];
