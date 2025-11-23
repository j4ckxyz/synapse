import { useState, useEffect } from "react";

const PROVIDER_STORAGE_KEY = "synapse-provider";

export function useProvider() {
  const [provider, setProvider] = useState<string>("openai");

  useEffect(() => {
    const storedProvider = localStorage.getItem(PROVIDER_STORAGE_KEY);
    if (storedProvider) {
      setProvider(storedProvider);
    }
  }, []);

  const saveProvider = (newProvider: string) => {
    localStorage.setItem(PROVIDER_STORAGE_KEY, newProvider);
    setProvider(newProvider);
  };

  return {
    provider,
    saveProvider,
  };
}
