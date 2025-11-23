import { useState, useEffect } from "react";

const API_KEYS_STORAGE_KEY = "synapse-api-keys";

interface ApiKeys {
	[providerId: string]: string;
}

export function useApiKey() {
	const [apiKeys, setApiKeys] = useState<ApiKeys>({});

	useEffect(() => {
		const storedKeys = localStorage.getItem(API_KEYS_STORAGE_KEY);
		if (storedKeys) {
			try {
				setApiKeys(JSON.parse(storedKeys));
			} catch (e) {
				console.error("Failed to parse stored API keys", e);
			}
		}
	}, []);

	const saveApiKey = (providerId: string, key: string) => {
		const updatedKeys = { ...apiKeys, [providerId]: key };
		localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(updatedKeys));
		setApiKeys(updatedKeys);
	};

	const removeApiKey = (providerId: string) => {
		const updatedKeys = { ...apiKeys };
		delete updatedKeys[providerId];
		localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(updatedKeys));
		setApiKeys(updatedKeys);
	};

	const getApiKey = (providerId: string): string | null => {
		return apiKeys[providerId] || null;
	};

	return {
		apiKeys,
		getApiKey,
		saveApiKey,
		removeApiKey,
	};
}
