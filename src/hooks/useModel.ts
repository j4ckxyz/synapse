import { useState, useEffect } from "react";

const MODEL_STORAGE_KEY = "synapse-model";

export function useModel() {
  const [model, setModel] = useState<string>("gpt-4o-mini");

  useEffect(() => {
    const storedModel = localStorage.getItem(MODEL_STORAGE_KEY);
    if (storedModel) {
      setModel(storedModel);
    }
  }, []);

  const saveModel = (newModel: string) => {
    localStorage.setItem(MODEL_STORAGE_KEY, newModel);
    setModel(newModel);
  };

  return {
    model,
    saveModel,
  };
}
