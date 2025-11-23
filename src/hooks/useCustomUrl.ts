import { useState, useEffect } from "react";

const CUSTOM_URL_STORAGE_KEY = "synapse-custom-url";

export function useCustomUrl() {
	const [customUrl, setCustomUrl] = useState<string>("");

	useEffect(() => {
		const storedUrl = localStorage.getItem(CUSTOM_URL_STORAGE_KEY);
		if (storedUrl) {
			setCustomUrl(storedUrl);
		}
	}, []);

	const saveCustomUrl = (url: string) => {
		localStorage.setItem(CUSTOM_URL_STORAGE_KEY, url);
		setCustomUrl(url);
	};

	const removeCustomUrl = () => {
		localStorage.removeItem(CUSTOM_URL_STORAGE_KEY);
		setCustomUrl("");
	};

	return {
		customUrl,
		saveCustomUrl,
		removeCustomUrl,
	};
}
