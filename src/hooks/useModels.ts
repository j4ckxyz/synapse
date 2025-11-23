import { useState, useEffect } from "react";

interface Model {
	id: string;
	name?: string;
}

// Predefined models for providers that don't have a models API
const PROVIDER_MODELS: Record<string, Model[]> = {
	anthropic: [
		{ id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
		{ id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku" },
		{ id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
		{ id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet" },
		{ id: "claude-3-haiku-20240307", name: "Claude 3 Haiku" },
	],
	google: [
		{ id: "gemini-2.0-flash-exp", name: "Gemini 2.0 Flash (Experimental)" },
		{ id: "gemini-1.5-pro-latest", name: "Gemini 1.5 Pro" },
		{ id: "gemini-1.5-flash-latest", name: "Gemini 1.5 Flash" },
		{ id: "gemini-pro", name: "Gemini Pro" },
	],
	xai: [
		{ id: "grok-beta", name: "Grok Beta" },
		{ id: "grok-vision-beta", name: "Grok Vision Beta" },
	],
};

export function useModels(provider: string, apiKey: string | null) {
	const [models, setModels] = useState<Model[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!provider) {
			setModels([]);
			return;
		}

		// Use predefined models for providers that don't have a models API
		if (PROVIDER_MODELS[provider]) {
			setModels(PROVIDER_MODELS[provider]);
			setIsLoading(false);
			setError(null);
			return;
		}

		// For custom provider, require API key
		if (provider === "custom" && !apiKey) {
			setModels([]);
			return;
		}

		// For other providers, fetch models if API key is provided
		if (!apiKey && provider !== "openrouter") {
			setModels([]);
			return;
		}

		const fetchModels = async () => {
			setIsLoading(true);
			setError(null);
			try {
				let response: Response;

				switch (provider) {
					case "openai":
						response = await fetch("https://api.openai.com/v1/models", {
							headers: {
								Authorization: `Bearer ${apiKey}`,
							},
						});
						break;
					case "openrouter":
						response = await fetch("https://openrouter.ai/api/v1/models");
						break;
					case "groq":
						response = await fetch("https://api.groq.com/openai/v1/models", {
							headers: {
								Authorization: `Bearer ${apiKey}`,
							},
						});
						break;
					default:
						setModels([]);
						setIsLoading(false);
						return;
				}

				if (!response.ok) {
					throw new Error("Failed to fetch models");
				}

				const data = await response.json();
				setModels(data.data || []);
			} catch (err) {
				setError(err as Error);
				setModels([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchModels();
	}, [provider, apiKey]);

	return { models, isLoading, error };
}
